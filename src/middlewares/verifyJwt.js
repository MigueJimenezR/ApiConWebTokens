import config from "../config";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) { return res.status(403).json({ message: "No token provided" }) }

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        console.log(user);
        if (!user) return res.status(404).json({ message: "Token no valiudo" })
        next();
    } catch (error) {
        res.status(400).json({ message: "Unauthorized" })
    }
}

export const isModerator = async(req, res, next) => {
    const user = await User.findById(req.userId);
    console.log(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Requer Moderator role" })
}
export const isAdmin = async(req, res, next) => {
    const user = await User.findById(req.userId);
    console.log(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Requer Moderator role" })
}