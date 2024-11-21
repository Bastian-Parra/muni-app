import {Sequelize} from 'sequelize'
import Config from './config.js'

// Configuración de la conexión a la base de datos
const DBConnection = new Sequelize(Config.name, Config.user, Config.password, {
    host: Config.host,
    dialect: Config.dialect,
})

// Testeamos la conexión
const testConnection = async () => {
    try {
        await DBConnection.authenticate()
        console.log("Conexión a la DB correcta")
    } catch (error) {
        console.error("No se pudo conectar: ", error)
    }
}

testConnection()

export default DBConnection
