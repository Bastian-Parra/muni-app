import AuthService from "../services/AuthService.js"
import jwt from 'jsonwebtoken'
import config from '../config/config.js'


const authRequired = (req, res, next) => {
    const {token} = req.cookies

    if (!token) {
        return res.status(401).json({ message: "Token de acceso requerido"})
    }

    jwt.verify(token, config.secretKey, (err, validUser) => {
        if(err) return res.status(403).json({ message: "Token de acceso inválido"})
        req.user = validUser
        console.log(req.user.id)
        next()
    })
}
const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: "No tiene permisos suficientes para este recurso"})
    }
    next()
}

const authorizeShift = async (req, res, next) => {
    const userId = req.user.id
    const isInShift = await AuthService.isUserInShift(userId)

    if (!isInShift) {
        return res.status(403).json({ message: "No se encuentra en un turno"})
    }
    next()
}



export { authRequired, authorizeRole, authorizeShift }