import ShiftController from '../controllers/ShiftController.js'
import express from 'express'
import {authorizeRole } from '../middlewares/Auth.js'
const router = express.Router()

router.get('/getAll', ShiftController.getAllShifts)
router.get('/getOne/:id', ShiftController.getShiftById)
router.post('/create', ShiftController.createShift)
router.put('/update/:id', ShiftController.updateShift)
router.delete('/delete/:id', ShiftController.deleteShift)

export default router