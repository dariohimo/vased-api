import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

//Middleware to authorize a teacher
export const authTeacher = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(400).json({ msg: "Invalid Authentication." });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ where: { id: decoded.user.id } });
        if (!user)
            return res.status(400).json({ msg: "Invalid Authentication." });

        if (user.roleId !== 2)
            return res.status(400).json({ msg: "Invalid Authentication." });

        req.body.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
