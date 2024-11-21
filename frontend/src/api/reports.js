import axios from './axios.js'

export const getAllReports = () => axios.get('/api/reports/get')
export const getReportById = (id) => axios.get(`/api/reports/getId/${id}`)
export const updateReport = (id, report) => axios.put(`/api/reports/update/${id}`, report)
export const deleteReport = (id) => axios.delete(`/api/reports/delete/${id}`)
export const createReport = (report) => axios.post(`/api/reports/new`, report)
export const getReportsCount = () => axios.get('/api/reports/count')
export const getShiftSummary = () => axios.get('/api/reports/shift-summary')
