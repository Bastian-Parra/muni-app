import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.get('/get', UserController.getAllUsers)
router.post('/new', UserController.createUser)
router.get('/getId/:id', UserController.getUserId)
router.put('/update/:id', UserController.updateUser)
router.delete('/delete/:id',UserController.deleteUser)

export default router
