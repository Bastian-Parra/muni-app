import {createContext, useContext, useEffect, useState} from 'react'
import { getAllReports, getReportById, updateReport, getReportsCount } from '../api/reports.js'
import { io } from 'socket.io-client'
const reportsContext = createContext()

export const useReports = () => {
    const context = useContext(reportsContext)

    if (!context) {
        throw new Error('useReports must be used within a ReportsProvider')
    }

    return context
}

export function ReportsProvider({ children }) {

    const [reports, setReports] = useState([])
    const [report, setReport] = useState([])
    const [reportsCount, setReportsCount] = useState(0)

    const getReports = async () => {
        try {
            const res = await getAllReports()
            setReports(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getReport = async (id) => {
        try {
            const res = await getReportById(id)
            setReport(res.data)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const modifyReport = async (id, data) => {
        try {
            await updateReport(id, data)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        const socket = io("http://localhost:4000")

        const fetchReportsCount = async () => {
            try {
                const res = await getReportsCount()
                setReportsCount(res.data.count)
            } catch (error) {
                console.error(error)
            }
        }

        fetchReportsCount()

        socket.on("updateReports", () => {
            console.log("Reportes recibidos event")
            fetchReportsCount()
        })

        return () => {
            socket.off("updateReports", fetchReportsCount);
            socket.disconnect();
        };
    }, [])

    return (
        <reportsContext.Provider
            value={{
                reportsCount,
                reports,
                report,
                getReports,
                getReport,
                modifyReport
            }}
        >
            {children}
        </reportsContext.Provider>
    )
}