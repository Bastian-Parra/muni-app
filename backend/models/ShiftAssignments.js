import { DataTypes } from "sequelize"
import DBConnection from "../config/database.js"
import User from "./Users.js"
import Shift from "./Shifts.js"

const ShiftAssignment = DBConnection.define('shiftassignments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    shift_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Shift,
            key: 'id'
        },
        allowNull: false
    },
    assignment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    tableName: 'shiftassignments',
    timestamps: false
})


// Relaciones
ShiftAssignment.belongsTo(User, { foreignKey: 'user_id' });
ShiftAssignment.belongsTo(Shift, { foreignKey: 'shift_id' });

User.hasMany(ShiftAssignment, { foreignKey: 'user_id' });
Shift.hasMany(ShiftAssignment, { foreignKey: 'shift_id' });

export default ShiftAssignment