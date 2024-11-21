import axios from './axios.js'

export const registerAPI = user => axios.post('/api/auth/register', user)
export const loginAPI = (user) => axios.post('/api/auth/login', user)
export const verifyTokenAPI = (token) => axios.get('/api/auth/token', {
    headers: {
        Authorization: `Bearer ${token}`,
    }
})