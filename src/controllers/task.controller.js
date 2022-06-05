import { Task } from "../models/taskModel.js";
import { User } from "../models/userModel.js";
import { Classroom } from "../models/classroomModel.js";
import { Task_Classroom } from "../models/task_classroomModel.js";
import { User_Task_Classroom } from "../models/user_task_classroomModel.js";
import { User_Classroom } from "../models/user_classroomModel.js";
import { Answer } from "../models/answerModel.js";

export const getTasks = async (req, res) => {
    try {
        const { user } = req.body;
        console.log(user);
        const tasks = await Task.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        if (user.user.role === 1) {
            res.json(tasks);
        } else {
            const userTasks = tasks.filter((task) => {
                return task.users.some(
                    (taskInClassroom) => taskInClassroom.id === user.id
                );
            });
            res.json(userTasks);
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getTaskClassrooms = async (req, res) => {
    try {
        const { user } = req.body;
        console.log(user);
        const task_classrooms = await Task_Classroom.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: Task,
                    as: "task",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: Classroom,
                    as: "classroom",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    include: [
                        {

                            model: User,
                            as: "users",
                            attributes: {
                                exclude: ["password", "createdAt", "updatedAt"],
                            },
                        },
                    ],

                },
                {
                    model: User,
                    as: "users",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"],
                    }
                }
            ],
        });

        if (user.user.role === 1) {
            res.json(task_classrooms);
        } else {
            const userTaskClassrooms = task_classrooms.filter((task_classroom) => {
                return task_classroom.classroom.users.some(
                    (userInClassroom) => userInClassroom.id === user.id
                );
            });
            res.json(userTaskClassrooms);
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }

}



export const createTask = async (req, res) => {
    //console.log(req)
    try {
        const { name, code, description, baseScore, user } = req.body;

        const newTask = await Task.create({
            name,
            code,
            description,
            baseScore,
            createdBy: user.id,
        });
        res.json(newTask);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//update task

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, description, baseScore } = req.body;

        const task = await Task.findByPk(id);
        task.name = name;
        task.code = code;
        task.description = description;
        task.baseScore = baseScore;

        await task.save();

        res.json(task);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

//delete task

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.destroy({
            where: {
                id,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const addTaskClassroomToUser = async (req, res) => {
    try {
        const { userId, taskClassroomId } = req.query;
        //check if user is in classroom
        const user = await User.findByPk(Number(userId));
        const taskClassroom = await Task_Classroom.findByPk(Number(taskClassroomId));
        const classroom = await Classroom.findByPk(taskClassroom.classroomId);
        const user_classroom = await User_Classroom.findOne({
            where: {
                userId: user.id,
                classroomId: classroom.id,
            }
        })

        if (!user_classroom) {
            return res.status(400).json({
                message: "User is not in classroom"
            })
        }

        

        const user_task_classroom = await User_Task_Classroom.create({
            userId: Number(userId),
            taskClassroomId: Number(taskClassroomId),
        });
        res.json(user_task_classroom);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const deleteUserTaskClassroom = async (req, res) => {
    try {
        const { userId, taskClassroomId } = req.query;
        const user_task_classroom = await User_Task_Classroom.findOne({
            where: {
                userId: Number(userId),
                taskClassroomId: Number(taskClassroomId),
            }
        });
        await user_task_classroom.destroy();
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}


export const getAnswer = async (req, res) => {
    try {
        const { userTaskClassroomId } = req.params;
        const answer = await Answer.findAll({
            where: {
                userTaskClassroomId: Number(userTaskClassroomId),
            }
        })

        if(!answer) {
            return res.status(400).json({
                message: "No answers found"
            })
        }

        res.json(answer);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}