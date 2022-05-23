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
};
