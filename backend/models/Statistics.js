import DBConnection from '../config/database.js'
import { DataTypes } from 'sequelize'

const Statistics = DBConnection.define('statistics', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date_range: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    period: {
        type: DataTypes.ENUM("diario", "semanal", "mensual"),
        allowNull: false
    },
    total_reports: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summary: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {timestamps: false})

export default Statistics