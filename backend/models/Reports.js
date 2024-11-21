import DBConnection from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./Users.js";

const Report = DBConnection.define('reports', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    report_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    shift: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    radio_operator: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    monitoring_operator_1: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    monitoring_operator_2: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    mobiles: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quadrant: {
        type: DataTypes.STRING,
        allowNull: false
    },
    portables: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    call_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    situation: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    closure: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false
    },
    derived_report: {
        type: DataTypes.STRING,
        allowNull: true
    }
    ,
    reporter_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    }
}, {timestamps: false})

Report.belongsTo(User, { foreignKey: 'reporter_id' })

export default Report