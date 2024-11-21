import ReportService from '../services/ReportService.js'

const ReportControllerFunc = (io) => {
    const getAllReports = async (req, res) => {
        try {
            const reports = await ReportService.getAllReports()
            res.status(200).json(reports)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    const createReport = async (req, res) => {
        try {
            const report = req.body;
            const newReport = await ReportService.createReport(report)
            
            io.emit('updateReports')
            res.status(201).json(newReport)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    const getReportById = async (req, res) => {
        try {
            const report = await ReportService.getReportById(req.params.id)
            if (!report) {
                return res.status(404).json({ error: 'Shift assignment not found' })
            }
            res.status(200).json(report)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    const updateReport = async (req, res) => {
        try {
            const report = await ReportService.updateReport(req.params.id, req.body)
            if(!report) {
                return res.status(404).json({ error: 'Report not found' })
            }
            io.emit('updateReports')
            res.status(200).json(report)
        } catch (error) {
            res.status(500).json({  error: error.message })
        }
    }

    const deleteReport = async (req, res) => {
        try {
            const report = await ReportService.deleteReport(req.params.id)
            if (!report) {
                return res.status(404).json({ error: 'report not found' })
            }
            io.emit('updateReports')
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    const getReportsCount = async (req, res) => {
        try {
            const count = await ReportService.getReportsCount()
            res.status(200).json({ count })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    const getShiftSummary = async (req, res) => {
        try {
            const summary = await ReportService.getShiftSummary()
            res.json(summary)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    const updateReports = async (req, res) => {
        await ReportService.updateShifts()
        res.send(" Turnos de los reportes actualizados correctamente")
    }

    return {
        updateReports,
        getAllReports,
        createReport,
        getReportById,
        updateReport,
        deleteReport,
        getReportsCount,
        getShiftSummary
    }
}

export default ReportControllerFunc