import dotenv from 'dotenv'

dotenv.config()

const Config = {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    secretKey: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION
}

export default Config