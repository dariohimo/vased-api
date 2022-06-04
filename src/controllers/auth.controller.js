import { User } from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendRecoveryPassword } from "../services/mails/recoveryPassword.js";
import { sendSuccessfullyReset } from "../services/mails/successfullyReset.js";

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

        res.json({
            token,
            user: {
                id: user.id,
                name: user.names + " " + user.lastNames,
                email: user.email,
                role: user.roleId,
            },
        });
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
            roleId,
            dniTypeId,
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
            dniTypeId,
            roleId,
            birthDate,
            city,
            country,
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

        res.json({
            token,
            user: {
                id: newUser.id,
                name: newUser.names,
                email: newUser.email,
                role: newUser.roleId,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// a controller that generates a one use token to reset a user's password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: "User not found." });

        const payload = {
            user: {
                id: user.id,
                name: user.names,
                email: user.email,
                role: user.roleId,
            },
        };
        const token = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET + user.password,
            {
                expiresIn: "15m",
            }
        );

        const url = `${process.env.FRONTEND_URL}/reset-password/${user.id}/${token}`;

        const response = await sendRecoveryPassword(user.email, url);

        res.json({ msg: "Email sent successfully.", url });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// a controller that resets a user's password
export const resetPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(400).json({ msg: "User not found." });

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET + user.password,
            async (err, decoded) => {
                if (err) return res.status(400).json({ msg: "Invalid token." });

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                user.isActive = true;
                user.password = hashPassword;
                await user.save();

                await sendSuccessfullyReset(user.email);

                res.json({ msg: "Password updated successfully." });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// activate a user account
export const activateAccount = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(400).json({ msg: "User not found." });
        if (user.isActive)
            return res.status(400).json({ msg: "User already active." });

        jwt.verify(
            token,
            process.env.ACTIVATION_TOKEN_SECRET + user.password,
            async (err, decoded) => {
                if (err) return res.status(400).json({ msg: "Invalid token." });

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                user.isActive = true;
                user.password = hashPassword;
                await user.save();

                res.json({ msg: "Account activated successfully." });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
