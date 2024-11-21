import ShiftAssignment from "../models/ShiftAssignments.js"
import User from "../models/Users.js"
import Shift from "../models/Shifts.js"
import { Op } from "sequelize"

const ShiftAssignmentService = {
    async assignShiftsForNext30Days() {
        const shifts = await Shift.findAll()
        const users = await User.findAll({where: { role: "CENCO" }})

        const days = getNext30Days()
        const groupCount = 3
        const rotationPattern = [true, true, true, true, false, false, false, false]
        const usersInGroup = Math.ceil(users.length / groupCount)

        for (let i = 0; i < days.length; i++) {
            const day = days[i]

            for (let group = 0; group < groupCount; group++) {
                const isWorkDay = rotationPattern[i % rotationPattern.length]
                if(isWorkDay) {
                    const shift = shifts[i % shifts.length]
                    for (let j = 0; j < usersInGroup; j++) {
                        const user = users[group * usersInGroup + j]
                        if (user) {
                            await ShiftAssignment.create({
                                user_id: user.id,
                                shift_id: shift.id,
                                assignment_date: day
                            })
                        }
                    }
                }
            }
        }
    },

    async getShiftAssignments(date) {
        return await ShiftAssignment.findAll({
            where: {
                assignment_date: {
                    [Op.eq]: date
                }
            },
            include: [User, Shift]
        })
    }
}

function getNext30Days() {
    const days = []
    const today = new Date()

    for (let i = 0; i< 30; i++) {
        const day = new Date(today)
        day.setDate(today.getDate() + i)
        days.push(day.toISOString().split('T')[0])
    }

    return days
}

export default ShiftAssignmentService