import { Task } from "../models/taskModel.js";

export const createTask = async (req, res) => {
    //console.log(req)
    try {
        const { name, code, description, baseScore } =
            req.body;

        const newTask = await Task.create({
            name,
            code,
            description,
            baseScore,
        });
        res.json(newTask);
    } catch (error) {
        return res.status(500).json({ message: error.message  });
    }
};