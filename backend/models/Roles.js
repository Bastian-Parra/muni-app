import { DataTypes } from "sequelize"
import DBConnection from "../config/database";

const Roles = DBConnection.define('roles', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_rol: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }
})

export default Roles