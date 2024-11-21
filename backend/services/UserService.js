import User from "../models/Users.js"
import Config from "../config/config.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {hashPassword, comparePassword} from '../utils/encryption.js'
import AuthService from "./AuthService.js"

const UserService = {
    async getAllUsers() {
        try {
            const users = await User.findAll()
            return users
        } catch (error) {
            throw new Error("Error al obtener los usuarios")
        }
    },

    async getUserById(userId) {
        try {
            const user = await User.findByPk(userId)
            if (!user) {
                throw new Error("El usuario no existe")
            }
            return user
        } catch (error) {
            throw new Error("Error al obtener el usuario")
        }
    },

    async createUser(username, password, department_id, role, id_rol) {
        try {
            const hashedPassword = await hashPassword(password)
            
            const user = await User.create({
                username: username,
                password: hashedPassword,
                department_id: department_id,
                role: role,
                id_rol: id_rol
            })  
            return user
        } catch (error) {
            throw new Error("Error al crear el usuario", error)
        }
    },

    async updateUser(userId, updatedData) {
        try {
            if (userData.password) {
                userData.password = await hashPassword(userData.password)
            }
            const user = await User.findByPk(userId)

            if(user) {
                return user.update(userData)
            } else {
                throw new Error("El usuario no existe")
            }

        } catch (error) {
            throw new Error("Error al actualizar el usuario")
        }
    },

    async deleteUser(userId) {
        try {
            const user = await User.getUserId(userId)
            
            if(!user) {
                throw new Error("El usuario no existe")
            }
            
            await user.destroy()
        } catch (error) {
            throw new Error("Error al eliminar el usuario")
        }
    }
}

export default UserService