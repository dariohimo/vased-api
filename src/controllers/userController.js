import { User } from "../models/userModel.js";


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//A route to login a user and return a JWT
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: "User not found." });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
            return res.status(400).json({ msg: "Invalid password." });

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

//A route to register a user and return a JWT
export const register = async (req, res) => {
    try {
        const {
            names,
            lastNames,
            email,
            password,
            dni,
            birthDate,
            city,
            country,
        } = req.body;
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
};
