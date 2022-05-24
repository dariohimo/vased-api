import { Classroom } from "../models/classroomModel.js";
import { User } from "../models/userModel.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { User_Classroom } from "../models/user_classroomModel.js";

// controller that returns all the classrooms with the users that are enrolled in them. If the user is an admin, it returns all the classrooms, otherwise it returns only the classrooms that the user is enrolled in.
export const getClassrooms = async (req, res) => {
    try {
        const { user } = req.body;
        console.log(user);
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
            ],
        });
        console.log(classrooms);
        const processedClassrooms = classrooms.map((classroom) => {
            const teachers = classroom.users.filter(
                (user) => user.roleId === 2
            );
            const students = classroom.users.filter(
                (user) => user.roleId === 3
            );
            return {
                ...classroom.dataValues,
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
                return classroom.users.some(
                    (userInClassroom) => userInClassroom.id === user.id
                );
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
            createdBy,
        } = req.body;

        const newClassroom = await Classroom.create({
            name,
            capacity,
            code,
            adminDescription,
            description,
            endsAt,
            createdBy,
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

// controller that creates a new user in a classroom. If user is not teacher, it returns an error. If the user is already enrolled in the classroom, it returns an error. If the user is not enrolled in the classroom, it creates a new user_classroom entry. The userId and classroomId are received in url params.
export const addTeacherToClassroom = async (req, res) => {
    try {
        const { teacherId, classroomId } = req.query;
        const user = await User.findByPk(Number(teacherId));

        const userClassroom = await User_Classroom.findOne({
            where: {
                classroomId,
                userId: teacherId,
            },
        });

        if (userClassroom) {
            return res.status(403).json({
                message: "User is already enrolled in the classroom",
            });
        }

        const user_classroom = await User_Classroom.create({
            userId: teacherId,
            classroomId,
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
