import express from 'express'
import ReportControllerFunc from '../controllers/ReportController.js'


const router = express.Router();

const createReportRoutes = (io) => {
    const ReportController = ReportControllerFunc(io);

    router.get('/get', ReportController.getAllReports);
    router.get('/getId/:id', ReportController.getReportById);
    router.post('/new', ReportController.createReport);
    router.put('/update/:id', ReportController.updateReport);
    router.delete('/delete/:id', ReportController.deleteReport);
    router.get('/count', ReportController.getReportsCount)
    router.get('/shift-summary', ReportController.getShiftSummary)
    router.get('/shift-update', ReportController.updateReports)
    return router;
};

export default createReportRoutes;
