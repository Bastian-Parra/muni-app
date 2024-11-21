import axios from './axios.js'

export const createShift = (shift) => axios.post('/api/shifts/create', shift)
export const getShifts = () => axios.get('/api/shifts/getAll')
export const getShiftById = (id) => axios.get(`/api/shifts/getOne/${id}`)
export const deleteShift = (id) => axios.delete(`/api/shifts/delete/${id}`)
export const updateShift = (id, shift) => axios.delete(`/api/shifts/update/${id}`, shift)