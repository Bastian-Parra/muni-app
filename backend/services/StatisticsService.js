import Report from '../models/Reports.js'
import Statistics from '../models/Statistics.js'
import {col, fn, Op, literal, QueryTypes} from 'sequelize'
import DBConnection from '../config/database.js'
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth} from 'date-fns'

const StatisticsService = {
    async generateStatistics(period) {
        let startDate
        let endDate = new Date()

        switch (period) {
            case "diario":
                startDate = new Date()
                startDate.setHours(0,0,0,0)
                break;
            case "semanal":
                startDate = new Date()
                startDate.setDate(startDate.getDate() - 7)
                break;
            case "mensual":
                startDate = new Date()
                startDate.setMonth(startDate.getMonth() - 1)
                break;
            default:
                throw new Error("Invalid period")
        }

        const reportCount = await Report.count({
            where: {
                report_date: {
                    [Op.between]: [startDate, endDate],
                },
            },
        })

        const statistics = await Statistics.create({
            generated_at: new Date(),
            report_count: reportCount,
            period,
            start_date: startDate,
            end_date: endDate,
        })

        return statistics
    },

    async getDailyStatistics() {
        try {
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    
            const dailyStats = await DBConnection.query(`
                SELECT
                    DATE_FORMAT(r.report_date, '%Y-%m-%d %H:%i:%s') AS report_time,
                    DAYNAME(r.report_date) AS day_of_week,
                    COUNT(r.id) AS count
                FROM reports r
                WHERE r.report_date BETWEEN :startOfDay AND :endOfDay
                GROUP BY r.report_date
                ORDER BY r.report_date;
            `, {
                replacements: { startOfDay, endOfDay },
                type: QueryTypes.SELECT,
            });
    
            return dailyStats;
        } catch (error) {
            console.log(error);
            throw new Error("Error obteniendo las estadísticas del día de hoy");
        }
    },

    async getWeeklyStatistics() {
        try {
            const startOfWeek = new Date();
            const dayOfWeek = startOfWeek.getDay(); // 0 es Domingo, 1 es Lunes, ..., 6 es Sábado
            const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? - 6 : 1); // Ajuste para que empiece el lunes
            startOfWeek.setDate(diff);
            startOfWeek.setHours(0, 0, 0, 0); // Establece la hora al inicio del día (00:00:00)
    
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6); // Ajuste para que termine el domingo
            endOfWeek.setHours(23, 59, 59, 999); // Establece la hora al final del día (23:59:59)
    
            const weeklyStats = await DBConnection.query(`
                SELECT 
                    DATE_FORMAT(date, '%Y-%m-%d') AS date,
                    DAYNAME(date) AS dayOfWeek,
                    COALESCE(COUNT(r.id), 0) AS count
                FROM (
                    SELECT DATE_ADD(:startDate, INTERVAL n DAY) AS date
                    FROM (
                        SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL 
                        SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL 
                        SELECT 6 UNION ALL SELECT 7
                    ) AS numbers
                ) AS dates
                LEFT JOIN reports r ON DATE(r.report_date) = dates.date
                WHERE dates.date BETWEEN :startDate AND :endDate
                GROUP BY dates.date
                ORDER BY dates.date;
            `, {
                replacements: { startDate: startOfWeek, endDate: endOfWeek },
                type: QueryTypes.SELECT,
            });
            console.log("Conteo semanal:", weeklyStats)
            return weeklyStats;
        } catch (error) {
            console.log(error);
            throw new Error("Error obteniendo las estadísticas semanales");
        }
    },

    async getMonthlyStatistics() {
        try {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
            const monthlyStats = await DBConnection.query(`
                SELECT
                    DATE_FORMAT(dates.date, '%Y-%m-%d') AS date,
                    DAYNAME(dates.date) AS day_of_week,
                    COALESCE(COUNT(r.id), 0) AS count
                FROM (
                    SELECT DATE_ADD(:startDate, INTERVAL n DAY) AS date
                    FROM (
                        SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL
                        SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL
                        SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL
                        SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL
                        SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL
                        SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL
                        SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20 UNION ALL
                        SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL
                        SELECT 24 UNION ALL SELECT 25 UNION ALL SELECT 26 UNION ALL
                        SELECT 27 UNION ALL SELECT 28 UNION ALL SELECT 29 UNION ALL
                        SELECT 30 UNION ALL SELECT 31
                    ) AS numbers
                ) AS dates
                LEFT JOIN reports r ON DATE(r.report_date) = dates.date
                WHERE dates.date BETWEEN :startDate AND :endDate
                GROUP BY dates.date
                ORDER BY dates.date;
            `, {
                replacements: { startDate: startOfMonth, endDate: endOfMonth },
                type: QueryTypes.SELECT,
            });
    
            return monthlyStats;
        } catch (error) {
            console.log(error)
            throw new Error("Error obteniendo las estadisticas mensuales")
        }
    },

    async getReportsWithCoordinates(startDate, endDate) {
        console.log(`Fetching reports from ${startDate.toISOString()} to ${endDate.toISOString()}`);
        return await Report.findAll({
            where: {
                report_date: {
                    [Op.between]: [startDate, endDate],
                },
                latitude: {
                    [Op.not]: null,
                },
                longitude: {
                    [Op.not]: null,
                },
            },
            attributes: ['latitude', 'longitude', 'situation', 'call_time', 'location', 'report_date', 'id']
        })
    },

    async getDailyReportCoordinates() {
            const today = new Date()
            const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
            return await this.getReportsWithCoordinates(start, end)
    },

    async getWeeklyReportCoordinates() {
        const today = new Date()
        const start = startOfWeek(today, {weekStartsOn: 0})
        const end = endOfWeek(today, {weekStartsOn: 0})
        return await this.getReportsWithCoordinates(start, end)
    },

    async getMonthlyReportCoordinates() {
        const today = new Date()
        const start = startOfMonth(today)
        const end = endOfMonth(today)
        return await this.getReportsWithCoordinates(start, end)
    },

    async getFilteredReports(dayOfWeek, shift) {
        try {
            // Convertir el nombre del día al número correspondiente
            const daysOfWeek = {
                "Lunes": 2,
                "Martes": 3,
                "Miércoles": 4,
                "Jueves": 5,
                "Viernes": 6,
                "Sábado": 7,
                "Domingo": 1
            };
            const dayNumber = daysOfWeek[dayOfWeek];
            
            console.log("Day of the Week:", dayOfWeek);
            console.log("Converted Day Number:", dayNumber);
            console.log("Shift:", shift);
    
            if (!dayNumber) {
                throw new Error("Día de la semana inválido");
            }
    
            const reports = await Report.findAll({
                where: {
                    [Op.and]: [
                        DBConnection.where(DBConnection.fn('DAYOFWEEK', DBConnection.col('report_date')), dayNumber),
                        { shift: shift }
                    ]
                },
                attributes: ["situation", [DBConnection.fn("COUNT", DBConnection.col("situation")), "count"]],
                group: ["situation"],
            });
    
            console.log("Reports:", reports);
    
            return reports;
        } catch (error) {
            console.error("Error: ", error);
            throw new Error("Error al filtrar los informes");
        }
    },

    async getReportsBySituationAndShift() {
        try {
            const reports = await Report.findAll({
                attributes: ["situation", "shift", [DBConnection.fn("COUNT", DBConnection.col("id")), "count"]],
                group: ["situation", "shift"],
                raw: true,
            })

            const groupedData = reports.reduce((acc, report) => {
                const { situation, shift, count } = report
                if(!acc[situation]) {
                    acc[situation] = { 'MAÑANA': 0, 'TARDE': 0, 'NOCHE': 0, 'MADRUGADA': 0 }
                }
                acc[situation][shift] = count
                return acc
            }, {})
            
            return groupedData
        } catch (error) {
            console.error("Error fetching reports ", error)
        }
    }
}

export default StatisticsService