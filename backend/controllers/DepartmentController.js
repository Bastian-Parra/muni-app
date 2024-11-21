import DepartmentService from '../services/DepartmentService.js'

const DepartmentController = {
    async getAllDepartments(req, res) {
        try {
            const departments = await DepartmentService.getAllDepartments()
            res.status(200).json(departments)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    async createDepartment(req, res) {
        try {
            const newDepartment = await DepartmentService.createDepartment(req.body)
            res.status(201).json(newDepartment)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    async getDepartmentById(req, res) {
        try {
            const shiftAssignment = await DepartmentService.getDepartmentId(req.params.id)
            if (!shiftAssignment) {
                return res.status(404).json({ error: 'Shift assignment not found' })
            }
            res.status(200).json(shiftAssignment)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    async updateDepartments(req, res) {
        try {
            const department = await DepartmentService.updateDepartment(req.params.id, req.body)
            if(!department) {
                return res.status(404).json({ error: 'Department not found' })
            }
            res.status(200).json(department)
        } catch (error) {
            res.status(500).json({  error: error.message })
        }
    },

    async deleteDepartment(req, res) {
        try {
            const department = await DepartmentService.deleteDepartment(req.params.id)
            if (!department) {
                return res.status(404).json({ error: 'Department not found' })
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default DepartmentController