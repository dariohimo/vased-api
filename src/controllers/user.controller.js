import { User } from "../models/userModel.js";
import { Classroom } from "../models/classroomModel.js";
import { Task_Classroom } from "../models/task_classroomModel.js";
import { User_Task_Classroom } from "../models/user_task_classroomModel.js";
import { User_Classroom } from "../models/user_classroomModel.js";
import { Answer } from "../models/answerModel.js";



export const createUser = async (req, res) => {
    try {
        const { names, lastNames, dni, email, birthDate, city, country } = req.body;

        const newUser = await User.create({
            names, lastNames, dni, email, birthDate, city, country, password:123
        });
        res.json(newUser);
} catch  (error) {
    return res.status(500).json({ message: error.message  });
}
};

/*UPDATE USER */

export const updateUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            names,
            lastNames,
            dni,
            email,
            birthDate,
            city,
            country,
            
        } =
        req.body;


        const user = await User.findByPk(id)

        user.names = names
        user.lastNames = lastNames
        user.dni = dni
        user.email = email
        user.birthDate = birthDate
        user.city = city
        user.country = country
        user.password = user.password
        await user.save()

        res.json(user)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

/* DELETE USER */

export const deleteUser = async (req, res) => {
    
    try {
        const {
            id
        } = req.params
        await User.destroy({
            where: {
                id,
            }
        });
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const getUser = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Classroom,
                    as: 'classrooms',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: Task_Classroom,
                    as: 'task_classrooms',
                },
            ]
        })

        // find all answers made by user through User_Task_Classroom
        const user_task_classrooms = await User_Task_Classroom.findAll(
            {
                where: {
                    userId: id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: Answer,
                        as: 'answer',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ]
            }
        )

        const answers = user_task_classrooms.map(user_task_classroom => {
            return user_task_classroom.answer
        }
        )
        res.json({
            ...user.dataValues,
            user_task_classrooms,
            answers
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: Classroom,
                    as: 'classrooms',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: Task_Classroom,
                    as: 'task_classrooms',
                },
            ]
        })

        // find all answers made by user through User_Task_Classroom
        const user_task_classrooms = await User_Task_Classroom.findAll(
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: Answer,
                        as: 'answer',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ]
            }
        )

        const answers = user_task_classrooms.map(user_task_classroom => {
            return user_task_classroom.answer
        }
        )
        const data = {
            users,
            user_task_classrooms,
            answers
        }
        res.json(data.users)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}