import { Classroom } from "../models/classroomModel.js";
import { User } from "../models/userModel.js";
import { User_Classroom } from "../models/user_classroomModel.js";
import { Task_Classroom } from "../models/task_classroomModel.js";
import { Task } from "../models/taskModel.js";
import { User_Task_Classroom } from "../models/user_task_classroomModel.js";

// controller that returns all the classrooms with the users that are enrolled in them. If the user is an admin, it returns all the classrooms, otherwise it returns only the classrooms that the user is enrolled in.
export const getClassrooms = async (req, res) => {
    try {
        const { user } = req.body;
        //console.log(user);
        const classrooms = await Classroom.findAll({
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
                {
                    model: Task,
                    as: "tasks",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                }
            ],
        });
        


        const processedClassrooms = classrooms.map((classroom) => {
            const teachers = classroom.users.filter(
                (user) => user.roleId === 2
            );
            const students = classroom.users.filter(
                (user) => user.roleId === 3
            );


            return {
                ...classroom.dataValues,
                totalStudents: students.length,
                users: {
                    teachers,
                    students,
                }
            };
        });

        if (user.user.role === 1) {
            res.json(processedClassrooms);
        } else {
            const userClassrooms = processedClassrooms.filter((classroom) => {
                return classroom.users.teachers.some(
                    (userInClassroom) => userInClassroom.id === user.user.id
                ) || classroom.users.students.some(
                    (userInClassroom) => userInClassroom.id === user.user.id
                ) ;
            });
            res.json(userClassrooms);
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const createClassroom = async (req, res) => {
    try {
        const {
            capacity,
            name,
            code,
            adminDescription,
            description,
            endsAt,
            user
        } = req.body;

        const newClassroom = await Classroom.create({
            name,
            capacity,
            code,
            adminDescription,
            description,
            endsAt,
            createdBy: user.id,
        });
        res.json(newClassroom);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const { capacity, name, code, adminDescription, description, endsAt } =
            req.body;

        const classroom = await Classroom.findByPk(id);
        classroom.capacity = capacity;
        classroom.name = name;
        classroom.code = code;
        classroom.adminDescription = adminDescription;
        classroom.description = description;
        classroom.endsAt = endsAt;
        await classroom.save();

        res.json(classroom);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        await Classroom.destroy({
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

// controller that creates a new user in a classroom. If user is not teacher, 
//it returns an error. If the user is already enrolled in the classroom, it returns an error.
// If the user is not enrolled in the classroom, it creates a new user_classroom entry.
//  The userId and classroomId are received in url params.

export const addUserToClassroom = async (req, res) => {
    try {
        const { userId, classroomId } = req.query;
        const user = await User.findByPk(Number(userId));
        const classroom = await Classroom.findByPk(Number(classroomId));

        // count the number of users with roleId = 3 in the classroom
        const userInClassroomCount = await User_Classroom.count({
            where: {
                classroomId: classroom.id,
                "$user.roleId$": 3,
            },
            include: [
                {
                    model: User,
                    as: "user",
                }
            ]
        })

        if(userInClassroomCount >= classroom.capacity) {
            return res.status(400).json({
                message: "The classroom is full"
            })
        }

        console.log(userInClassroomCount);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        const userClassroom = await User_Classroom.findOne({
            where: {
                classroomId,
                userId
            },
        });

        if (userClassroom) {
            return res.status(403).json({
                message: "User is already enrolled in the classroom",
            });
        }

        const user_classroom = await User_Classroom.create({
            userId,
            classroomId,
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const addTaskToClassroom = async (req, res) => {
    try {
        const { taskId, classroomId } = req.query;

        const taskClassroom = await Task_Classroom.findOne({
            where: {
                classroomId,
                taskId
            },
        });

        if (taskClassroom) {
            return res.status(403).json({
                message: "Task is already in the classroom",
            });
        }

        const task_classroom = await Task_Classroom.create({
            taskId,
            classroomId,
        });


        res.json(task_classroom);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const deleteUserFromClassroom = async (req, res) => {
    try {
        const { userId, classroomId } = req.query;
        const user = await User.findByPk(Number(userId));
        const classroom = await Classroom.findByPk(Number(classroomId));

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        const userClassroom = await User_Classroom.findOne({
            where: {
                classroomId,
                userId
            },
        });

        if (!userClassroom) {
            return res.status(403).json({
                message: "User is not enrolled in the classroom",
            });
        }

        await User_Classroom.destroy({
            where: {
                classroomId,
                userId
            },
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const deleteTaskFromClassroom = async (req, res) => {
    try {
        const { taskId, classroomId } = req.query;

        const taskClassroom = await Task_Classroom.findOne({
            where: {
                classroomId,
                taskId
            },
        });

        if (!taskClassroom) {
            return res.status(403).json({
                message: "Task is not in the classroom",
            });
        }

        await Task_Classroom.destroy({
            where: {
                classroomId,
                taskId
            },
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}