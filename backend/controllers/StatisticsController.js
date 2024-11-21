import StatisticsService from "../services/StatisticsService.js";

const StatisticsController = {
    async generateStatistics(req, res) {
        const { period } = req.body

        try {
            const statistics = await StatisticsService.generateStatistics(period)
            res.status(201).json(statistics)
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    async getStatistics(req, res) {
        try {
            const statistics = await StatisticsService.getStatistics()
            res.json(statistics)
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    async getDailyStatistics(req, res) {
        try {
            const stats = await StatisticsService.getDailyStatistics()
            res.json(stats)
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    async getWeeklyStatistics(req, res) {
        try {
            const stats = await StatisticsService.getWeeklyStatistics()
            res.json(stats)
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    async getMonthlyStatistics(req, res) {
        try {
            const stats = await StatisticsService.getMonthlyStatistics()
            res.json(stats)
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    async getDailyReportCoordinates(req, res) {
        try {
            const coordinates = await StatisticsService.getDailyReportCoordinates()
            res.json(coordinates)
        } catch (error) {
            res.status(500).json({ error: "Error al obtener coordenadas diarias."})
        }
    },

    async getWeeklyReportCoordinates(req, res) {
        try {
            const coordinates = await StatisticsService.getWeeklyReportCoordinates()
            res.json(coordinates)
        } catch (error) {
            res.status(500).json({ error: "Error al obtener coordenadas semanales."})
        }
    },

    async getMonthlyReportCoordinates(req, res) {
        try {
            const coordinates = await StatisticsService.getMonthlyReportCoordinates()
            res.json(coordinates)
        } catch (error) {
            res.status(500).json({ error: "Error al obtener coordenadas mensuales."})
        }
    },

    async getFilteredReports(req, res) {
        const { dayOfWeek, shift } = req.query

        try {
            const reports = await StatisticsService.getFilteredReports(dayOfWeek, shift)
            res.json(reports)

        } catch (error) {
            res.status(500).json({ error: "Error al obtener los reportes filtrados por dia y turno" })
        }
    },

    async getReportsBySituationAndShift(req, res) {
        try {
            const reports = await StatisticsService.getReportsBySituationAndShift()
            res.json(reports)
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los reportes por situación y turno" })
        }
    }
}

export default StatisticsController