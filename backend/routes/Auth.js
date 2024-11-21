import express from 'express'
import { validateSchema } from '../middlewares/Validate.js'
import {loginSchema, registerSchema} from '../schemas/authSchema.js'
import AuthController from '../controllers/AuthController.js'
const router = express.Router()

router.post('/register', validateSchema(registerSchema), AuthController.register)
router.post('/login', AuthController.login)
router.get('/token', AuthController.verifyToken)

export default router