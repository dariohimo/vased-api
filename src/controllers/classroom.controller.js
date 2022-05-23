import { Classroom } from "../models/classroomModel.js";

export const createClassroom = async (req, res) => {
    try {
        const { capacity, name, code, adminDescription, description, endsAt } =
            req.body;

        const newClassroom = await Classroom.create({
            name,
            capacity,
            code,
            adminDescription,
            description,
            endsAt,
        });
        res.json(newClassroom);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateClassroom = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            capacity,
            name,
            code,
            adminDescription,
            description,
            endsAt
        } =
        req.body;


        const classroom = await Classroom.findByPk(id)
        classroom.capacity = capacity
        classroom.name = name
        classroom.code = code
        classroom.adminDescription = adminDescription
        classroom.description = description
        classroom.endsAt = endsAt
        await classroom.save()

        res.json(classroom)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

export const deleteClassroom = async (req, res) => {
    
    try {
        const {
            id
        } = req.params
        await Classroom.destroy({
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

