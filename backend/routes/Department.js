import express from 'express'
import DepartmentController from '../controllers/DepartmentController.js'
const router = express.Router()

router.get('/get', DepartmentController.getAllDepartments)
router.get('/getId/:id', DepartmentController.getDepartmentById)
router.post('/new', DepartmentController.createDepartment)
router.put('/update/:id', DepartmentController.updateDepartments)
router.delete('/delete/:id', DepartmentController.deleteDepartment)

export default router