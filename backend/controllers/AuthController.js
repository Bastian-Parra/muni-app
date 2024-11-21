import User from "../models/Users.js";
import AuthService from "../services/AuthService.js";
import jwt from 'jsonwebtoken';
import Config from "../config/config.js";

const AuthController = {
    async register(req, res) {
        const { username, password, role} = req.body
        
        try {
            const userExists = await AuthService.verifyUser(username)

            if (userExists) {
                return res.status(409).json(["Correo ya utilizado"])
            }

            const newUser = await AuthService.register(username, password, role)
            const token = await createAccessToken({ id: newUser.id })

            res.cookie("token", token)

            res.status(200).json({
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
                message: "Registro exitoso",
                id_rol: newUser.id_rol,
                token: token
            })
        } catch (error) {
            console.error("Error al registrar el usuario: ", error)
            res.status(500).json({ success: false, message: 'Error al registrar usuario' })
        }
    },

    async login(req, res) {
        try {
            const {username, password, role} = req.body
            console.log(req.body)
            if(!username || username.trim() === "") {
                return res.status(400).json(['Debes ingresar un correo'])
            }

            if(!password || password.trim() === "") {
                return res.status(400).json(['Debes ingresar una contraseña'])
            }

            const {user, token} = await AuthService.authenticateUser(username, password, role)

            res.cookie("token", token)
            console.log(user)
            res.status(200).json({
                id: user.id,
                username: user.username,
                role: user.role,
                message: "Login exitoso",
                token: token,
                id_rol: user.id_rol
            })

        } catch (error) {
            res.status(400).json([error.message])
        }
    },

    async verifyToken(req, res) {
        const { token } = req.cookies

        if(!token) return res.status(401).json({ message: 'No autorizado' })

        try {
            const userFounded = await AuthService.verifyToken(token)

            return res.json({
                id: userFounded.id,
                username: userFounded.username,
                role: userFounded.role,
                id_rol: userFounded.id_rol,
                message: 'Token válido'
            })
        } catch (error) {
            res.status(401).json([error.message])
        }
    }
}

export default AuthController