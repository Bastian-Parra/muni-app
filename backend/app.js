import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// DB imports
import DBConnection from './config/database.js'
/// ==== routes ====
import userRoutes from './routes/User.js'
import departmentRoutes from './routes/Department.js'
import createReportRoutes from './routes/Report.js'
import statisticsRoutes from './routes/Statistics.js'
import shiftRoutes from './routes/Shift.js'
import shiftAssignmentRoutes from './routes/ShiftAssignments.js'
import {authorizeRole } from './middlewares/Auth.js'
import authRoutes from './routes/Auth.js'
import http from 'http'
import { Server } from 'socket.io'
// ==================

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})

const options = [
    'http://localhost:5173', // puerto por defecto vite
    'http://localhost:5174',
    'http://localhost:5175'
]

const corsOptions = {
    origin: (origin, callback) => {
        if(options.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    },
    credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/departments', authorizeRole(['SUPERVISOR']), departmentRoutes)
app.use('/api/reports', createReportRoutes(io))
app.use('/api/stats', statisticsRoutes)
app.use('/api/shifts', authorizeRole(['SUPERVISOR', 'CENCO']), shiftRoutes)
app.use('/api/shiftAssignments', authorizeRole(['SUPERVISOR']), shiftAssignmentRoutes)


// Manejo de errores

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)

    try {
        await DBConnection.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.')
    } catch (error) {
        console.error('No se pudo conectar a la base de datos: ', error)
    }
})

export default app
