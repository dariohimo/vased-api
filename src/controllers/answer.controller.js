import { Answer } from "../models/answerModel.js";
import { Task } from "../models/taskModel.js";
import { User } from "../models/userModel.js";
import { Classroom } from "../models/classroomModel.js";
import { Task_Classroom } from "../models/task_classroomModel.js";
import { User_Task_Classroom } from "../models/user_task_classroomModel.js";
import { User_Classroom } from "../models/user_classroomModel.js";


// controller for create a new answer
export const createAnswer = async (req, res) => {
    try {
        const { answer,  userTaskClassroomId } = req.body;
        const newAnswer = await Answer.create({
            answer_text: answer,
            userTaskClassroomId
        });
        res.json(newAnswer);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// controller to add feedback to an answer
export const addFeedback = async (req, res) => {
    try {
        const { answerId, feedback, score } = req.body;
        const answer = await Answer.findByPk(answerId);

        if(!answer) {
            return res.status(404).json({
                message: "Answer not found"
            })
        }

        if(answer.feedback) {
            return res.status(400).json({
                message: "Feedback already added"
            })
        }

        const updatedAnswer = await answer.update({
            feedback,
            score
        })

        res.json(updatedAnswer);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}


// controller to get all answers of a user
export const getAnswersByUser = async (req, res) => {
    try {
        const { user } = req.body;
        const { userId } = req.params;
        const answers = await Answer.findAll({
            where: {
                "$user_task_classroom.userId$": userId,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: User_Task_Classroom,
                    as: "user_task_classroom",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: User,
                            as: "user",
                        },
                        {
                            model: Task_Classroom,
                            as: "task_classroom",
                            attributes: {
                                exclude: ["createdAt", "updatedAt"],
                            },
                            include: [
                                {
                                    model: Task,
                                    as: "task",
                                    attributes: {
                                        exclude: ["createdAt", "updatedAt"],
                                    }
                                }
                            ]
                        }
                    ]
                },
            ],
        });
        res.json(answers);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}


export const getAnswersByUserAndClassroom = async (req, res) => {
    try {
        const { user } = req.body;
        const { userId, classroomId } = req.params;

        const answers = await Answer.findAll({
            where: {
                "$user_task_classroom.userId$": userId,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: User_Task_Classroom,
                    as: "user_task_classroom",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: User,
                            as: "user",
                        },
                        {
                            model: Task_Classroom,
                            as: "task_classroom",
                            attributes: {
                                exclude: ["createdAt", "updatedAt"],
                            },
                            include: [
                                {
                                    model: Task,
                                    as: "task",
                                    attributes: {
                                        exclude: ["createdAt", "updatedAt"],
                                    }
                                },
                                {
                                    model: Classroom,
                                    as: "classroom",
                                    attributes: {
                                        exclude: ["createdAt", "updatedAt"],
                                    }
                                }
                            ]
                        }
                    ]
                },
            ],
        });

        // exclude answers from other classrooms
        const answersFiltered = answers.filter(answer => {
            return answer.user_task_classroom.task_classroom.classroom.id == classroomId;
        })

        res.json({
            answers: answersFiltered,
            totalAnswers: answersFiltered.length
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}