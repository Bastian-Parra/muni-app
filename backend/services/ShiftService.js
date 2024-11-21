import Shift from "../models/Shifts.js"
import ShiftAssignment from "../models/ShiftAssignments.js"

const ShiftService = {
    async getAllShifts() {
        try {
            const shifts = await Shift.findAll({
                where: {userId},
                include: [Shift]
            })
            return shifts
        } catch (error) {
            throw new Error("Error al obtener los usuarios")
        }
    },

    async getShiftId(shiftId) {
        try {
            const shift = await Shift.findByPk(shiftId)
            if (!shift) {
                throw new Error("El usuario no existe")
            }
            return shift
        } catch (error) {
            throw new Error("Error al obtener el usuario")
        }
    },

    async createShift(shiftData) {
        try {
            const shift = await Shift.create(shiftData)
            return shift
        } catch (error) {
            throw new Error("Error al crear el usuario")
        }
    },

    async assignShift(userId, shiftId, date) {
        return ShiftAssignment.create({userId, shiftId, date})
    },

    async updateShift(shiftId, updatedData) {
        try {
            const shift = await Shift.getShiftId(shiftId)
            
            if(!shift) {
                throw new Error("El usuario no existe")
            }

            await shift.update(updatedData)
        } catch (error) {
            throw new Error("Error al actualizar el usuario")
        }
    },

    async deleteShift(shiftId) {
        try {
            const shift = await Shift.getShiftId(shiftId)
            
            if(!Shift) {
                throw new Error("El usuario no existe")
            }
            
            await shift.destroy()
        } catch (error) {
            throw new Error("Error al eliminar el usuario")
        }
    }
}

export default ShiftService