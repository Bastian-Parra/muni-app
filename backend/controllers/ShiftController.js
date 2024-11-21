import ShiftService from '../services/ShiftService.js'

const ShiftController = {
    async getAllShifts(req, res) {
        try {
            const shifts = await ShiftService.getAllShifts()
            res.status(200).json(shifts)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    async createShift(req, res) {
        try {
            const newShift = await ShiftService.createShift(req.body)
            res.status(201).json(newShift)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    async getShiftById(req, res) {
        try {
            const shiftAssignment = await ShiftService.getShiftId(req.params.id)
            if (!shiftAssignment) {
                return res.status(404).json({ error: 'Shift assignment not found' })
            }
            res.status(200).json(shiftAssignment)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    async updateShift(req, res) {
        try {
            const shift = await ShiftService.updateShift(req.params.id, req.body)
            if(!shift) {
                return res.status(404).json({ error: 'Shift not found' })
            }
            res.status(200).json(shift)
        } catch (error) {
            res.status(500).json({  error: error.message })
        }
    },
    async deleteShift(req, res) {
        try {
            const shift = await ShiftService.deleteShift(req.params.id)
            if (!shift) {
                return res.status(404).json({ error: 'Shift not found' })
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default ShiftController