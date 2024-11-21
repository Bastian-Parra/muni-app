import DBConnection from "../config/database.js"
import { DataTypes } from "sequelize"

const Department = DBConnection.define("Department", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: "departments",
    timestamps: false
})

export default Department