import UserService from '../services/UserService.js'

const UserController = {
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    async createUser(req, res) {
        try {
            const { username, password, department_id, role, id_rol } = req.body
            const newUser = await UserService.createUser(username, password, department_id, role, id_rol)
            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    async getUserId(req, res) {
        try {
            const user = await UserService.getUserById(req.params.userId)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await UserService.updateUser(req.params.userId, req.body)
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.userId)
            res.status(204).end()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default UserController