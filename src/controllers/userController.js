import { User } from "../models/userModel.js";
import { DniType } from "../models/dniTypeModel.js";
import { Role } from "../models/roleModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authAdmin } from "../middlewares/authAdmin.js";


import { Router } from "express";


export const userRouter = Router();

//A route to login a user and return a JWT token
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: "User not found." });
    
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ msg: "Invalid password." });
    
        const payload = {
        user: {
            id: user.id,
            name: user.names,
            email: user.email,
            role: user.roleId,
        },
        };
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
        });
    
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

//A route to register a user and return a JWT token
export const register = async (req, res) => {
    try {
        const { names, lastNames, email, password, dni, birthDate, city, country } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: "User already exists." });
    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
        names,
        lastNames,
        email,
        password: hashPassword,
        dni,
        dniType: 1,
        roleId: 1,
        });
        await newUser.save();
    
        const payload = {
        user: {
            id: newUser.id,
            name: newUser.names,
            email: newUser.email,
            role: newUser.roleId,
        },
        };
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
        });
    
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

//route that returns hello world
export const helloWorld = async (req, res) => {
    try {
        res.json({ msg: "Hello World" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

// //route that creates a new role
// export const createRole = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const role = await Role.findOne({ where: { name } });
//         if (role) return res.status(400).json({ msg: "Role already exists." });
    
//         const newRole = new Role({
//         name,
//         });
//         await newRole.save();
    
//         res.json({ msg: "Role created." });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// }


// route that returns all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: DniType,
                    attributes: ["name"],
                },
                {
                    model: Role,
                    attributes: ["name"],
                },
            ],
        });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

// route that creates a new DniType
export const createDniType = async (req, res) => {
    try {
        const { name } = req.body;
        const dniType = await DniType.findOne({ where: { name } });
        if (dniType) return res.status(400).json({ msg: "DniType already exists." });
    
        const newDniType = new DniType({
        name,
        });
        await newDniType.save();
    
        res.json({ msg: "DniType created." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

userRouter.get("/login", login);
userRouter.get("/register", register);
userRouter.get("/helloWorld", authAdmin, helloWorld);
userRouter.get("/users", getUsers);
userRouter.post("/createDniType", createDniType);