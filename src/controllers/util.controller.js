import { DniType } from "../models/dniTypeModel.js";
import { Role } from "../models/roleModel.js";


// controller that creates a new DniType
export const createDniType = async (req, res) => {
    try {
        const { name } = req.body;

        const newDniType = await DniType.create({
            name,
        });
        res.json(newDniType);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// controller that creates a new Role
export const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        const newRole = await Role.create({
            name,
        });
        res.json(newRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}