import axios from './axios.js'

export const getAllUsers = () => axios.get('/api/users/get')
export const getUserById = (id) => axios.get(`/api/users/getId/${id}`)
export const updateUser = (id, user) => axios.put(`/api/users/update/${id}`, user)
export const deleteUser = (id) => axios.delete(`/api/users/delete/${id}`)
export const createUser = (user) => axios.post(`/api/users/create`, user)