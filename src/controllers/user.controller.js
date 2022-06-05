import { User } from "../models/userModel.js";
import { Classroom } from "../models/classroomModel.js";
import { Task_Classroom } from "../models/task_classroomModel.js";
import { User_Task_Classroom } from "../models/user_task_classroomModel.js";
import { Answer } from "../models/answerModel.js";
import { sendActivateAccount } from "../services/mails/activateAccount.js";
import { Task } from "../models/taskModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {
        const {
            names,
            lastNames,
            dni,
            email,
            birthDate,
            city,
            country,
            roleId,
            dniTypeId,
        } = req.body;

        // generate random alphanumeric password
        const password = Math.random().toString(36).slice(-8);

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            names,
            lastNames,
            dni,
            email,
            birthDate,
            city,
            country,
            password: hashPassword,
            roleId,
            dniTypeId,
        });

        // generate token
        const payload = {
            user: {
                id: newUser.id,
                name: newUser.names,
                email: newUser.email,
                role: newUser.roleId,
            },
        };
        const token = jwt.sign(
            payload,
            process.env.ACTIVATION_TOKEN_SECRET + hashPassword,
            {
                expiresIn: "7d",
            }
        );

        const url = `${process.env.FRONTEND_URL}/activate-account/${newUser.id}/${token}`;

        // send email
        await sendActivateAccount(newUser.email, url);

        res.json({
            newUser,
            url,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/*UPDATE USER */

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { names, lastNames, dni, email, birthDate, city, country } =
            req.body;
        console.log(req.body);
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        user.names = names;
        user.lastNames = lastNames;
        user.dni = dni;
        user.email = email;
        user.birthDate = birthDate;
        user.city = city;
        user.country = country;
        user.password = user.password;
        await user.save();

        res.json(user);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

/* DELETE USER */

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({
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

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
            include: [
                {
                    model: Classroom,
                    as: "classrooms",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: User_Task_Classroom,
                    as: "user_task_classrooms",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: Answer,
                            as: "answer",
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
                                    },
                                },
                                {
                                    model: Classroom,
                                    as: "classroom",
                                    attributes: {
                                        exclude: ["createdAt", "updatedAt"],
                                    }
                                }
                            ],
                        },
                    ],
                },
            ],
        });
        res.json(user);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
            include: [
                {
                    model: Classroom,
                    as: "classrooms",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: User_Task_Classroom,
                    as: "user_task_classrooms",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: Answer,
                            as: "answer",
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
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        res.json(users);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
