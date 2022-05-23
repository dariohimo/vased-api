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

//update task

export const updateTask = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            code,
            description,
            baseScore,
        } =
        req.body;


        const task = await Task.findByPk(id)
        task.name = name
        task.code = code
        task.description = description
        task.baseScore = baseScore
        
        await task.save()

        res.json(task)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}