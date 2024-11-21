import StatisticsController from "../controllers/StatisticsController.js"
import express from 'express'
const router = express.Router()

router.post('/generate', StatisticsController.generateStatistics)
router.get('/daily', StatisticsController.getDailyStatistics)
router.get('/monthly', StatisticsController.getMonthlyStatistics)
router.get('/weekly', StatisticsController.getWeeklyStatistics)
router.get('/getStats', StatisticsController.getStatistics)
router.get('/coordinates/daily', StatisticsController.getDailyReportCoordinates)
router.get('/coordinates/weekly', StatisticsController.getWeeklyReportCoordinates)
router.get('/coordinates/monthly', StatisticsController.getMonthlyReportCoordinates)
router.get('/filtered-reports', StatisticsController.getFilteredReports)
router.get('/filtered-reports-2', StatisticsController.getReportsBySituationAndShift)

export default router