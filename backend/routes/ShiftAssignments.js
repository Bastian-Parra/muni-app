import ShiftAssignmentController from '../controllers/ShiftAssignmentController.js'
import express from 'express'
import {authorizeRole } from '../middlewares/Auth.js'
const router = express.Router()

router.post('/assign', ShiftAssignmentController.assignShifts)
router.get('/get/:date', ShiftAssignmentController.getShiftAssignments)

export default router