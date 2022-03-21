import User from '../models/User'
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';


//registro
export const singUp = async(req, res) => {
        const { username, email, password, roles } = req.body;
        //const userFount = User.find({email})
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })

        if (roles) {
            const fountRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = fountRoles.map((role) => role._id);
        } else {
            console.log("entro");
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        const saveUser = await newUser.save();
        console.log(newUser);
        const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
            expiresIn: 86400 //un dia en segundos
        })
        res.status(200).json({ token })
    }
    //login
export const singin = async(req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const userFound = await User.findOne({ email: req.body.email }).populate("roles")
    if (!userFound) {
        return res.status(204).json({ "mensaje": "Usuario no encontrado" })
    }
    const matcPassword = await User.comparePassword(password, userFound.password);
    if (!matcPassword) { return res.status(204).json({ message: "Contraseña no valida" }) }
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })
    res.json({ token: token })
}