import ShiftAssignmentService from '../services/ShiftAssignmentService.js'

const ShiftAssignmentController = {
    async assignShifts(req, res) {
        try {
            await ShiftAssignmentService.assignShiftsForNext30Days()
            res.status(200).json({ message: 'Shifts have been assigned'})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    async getShiftAssignments(req, res) {
        try {
            const assignments = await ShiftAssignmentService.getShiftAssignments(req.params.date)
            res.status(200).json(assignments)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default ShiftAssignmentController