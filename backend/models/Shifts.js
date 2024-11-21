import { DataTypes } from "sequelize";
import DBConnection from "../config/database.js";

const Shift = DBConnection.define('Shift', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shift_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
    }
}, {
    tableName: "shifts",
    timestamps: false
})

export default Shift
