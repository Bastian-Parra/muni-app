import Report from '../models/Reports.js'
import User from '../models/Users.js'
const ReportService = {
    async getAllReports() {
        try {
            return await Report.findAll({
                include: [User],
            })
        } catch (error) {
            throw new Error("Error al obtener los datos")
        }
    },

    async createReport(reportData) {
        try {
            console.log(reportData.report_date)
            const report = await Report.create(reportData);
            return report;
        } catch (error) {
            throw new Error("Error al crear el reporte: " + error.message);
        }
    },

    async getReportById(reportId) {
        try {
            return await Report.findByPk(reportId, {
                include: [User],
            })
        } catch (error) {
            throw new Error("Error al obtener el reporte")
        }
    },

    async updateReport(reportId, reportData) {
        try {
            const report = await Report.findByPk(reportId)

            if (!report) {
                throw new Error("El reporte no existe")
            }

            return await report.update(reportData)
        } catch (error) {
            throw new Error("Error al actualizar el reporte")
        }
    },

    async deleteReport(reportId) {
        try {
            const report = await Report.findByPk(reportId)

            if (!report) {
                throw new Error("El reporte no existe")
            }

            return await report.destroy()
        } catch (error) {
            throw new Error("Error al eliminar el reporte")
        }
    },

    async getReportsCount() {
        try {
            const count = await Report.count()
            return count
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async getShiftSummary(userId) {
        try {
            const currentTime = new Date().getHours()
            const currentDate = new Date().toISOString().split("T")[0]
            const shift = currentTime >= 6 && currentTime < 12 ? "MAÑANA" :
              currentTime >= 12 && currentTime < 18 ? "MEDIO DÍA" :
              currentTime >= 18 && currentTime < 24 ? "TARDE" :
              "NOCHE"

            const shiftReports = await Report.findAll({
                where: { shift: shift, report_date: currentDate}
            })

            const totalReports = shiftReports.length
            const topSituations = shiftReports.reduce((acc, report) => {
                acc[report.situation] = (acc[report.situation] || 0) + 1
                return acc
            }, {})

            return {totalReports, topSituations}
        } catch (error) {
            throw new Error("Error al obtener el resumen del turno")
        }
    },

    async updateShifts() {
        try {
            const reports = await Report.findAll()

            for (let report of reports) {
                const [hours, minutes] = report.call_time.split(":").map(Number)
                let shift

                if (hours >= 6 && hours < 12) {
                    shift = "MAÑANA";
                } else if (hours >= 12 && hours < 18) {
                    shift = "MEDIO DÍA";
                } else if (hours >= 18 && hours < 24) {
                    shift = "TARDE";
                } else {
                    shift = "NOCHE";
                }
    
                report.shift = shift;
                await report.save();

                console.log("Todos los reportes han sido actualizados correctamente.");
            }
        } catch (error) {
            console.error("Error al actualizar los turnos de los reportes:", error);
        }
    }
}

export default ReportService