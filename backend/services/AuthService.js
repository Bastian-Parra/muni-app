import User from '../models/Users.js'
import jwt from 'jsonwebtoken'
import { comparePassword, hashPassword } from '../utils/encryption.js'
import Config from '../config/config.js'

const AuthService = {
    async verifyUser(username) {
        try {
            const user = await User.findOne({ where: { username: username } })
            return !!user
        } catch (error) {
            throw error
        }
    },

    async register(username, password, role) {
        try {
            const hashedPassword = await hashPassword(password)

            const newUser = await User.create({
                username: username,
                password: hashedPassword,
                role: role
            })

            return newUser
        } catch (error) {
            throw error
        }
    },

    async authenticateUser(username, password, role) {
        try {
            console.log(username)
            const user = await User.findOne({ where: { username } })

            if (!user) {
                throw new Error("Usuario no encontrado.")
            }
            const isValidPassword = await comparePassword(password, user.password)

            if (!isValidPassword) {
                throw new Error("Contraseña incorrecta.")
            }

            if (role !== user.role) {
                throw new Error("La cuenta no corresponde al departamento ingresado.")
            }

            const token = jwt.sign(
                { id: user.id },
                Config.secretKey,
                { expiresIn: '4h' }
            )

            return { user, token }
        } catch (error) {
            throw error
        }
    },

    async verifyToken(token) {
        try {
            const user = jwt.verify(token, Config.secretKey)
            const userFounded = await User.findByPk(user.id)

            if (!userFounded) {
                throw new Error("Usuario no encontrado")
            }

            return userFounded
        } catch (error) {
            throw error
        }
    }
}

export default AuthService