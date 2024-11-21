import {useState, useEffect} from 'react'
import StatisticsAPI from '../api/statistics.js'
import { io } from 'socket.io-client'

export function useFetchStatistics() {
    const [dailyCount, setDailyCount] = useState(0)
    const [weeklyCount, setWeeklyCount] = useState(0)
    const [monthlyCount, setMonthlyCount] = useState(0)
    const [weeklyStats, setWeeklyStats] = useState([])
    const [monthlyStats, setMonthlyStats] = useState([])
    const [selectedMap, setSelectedMap] = useState("daily")
    const socket = io("http://localhost:4000")


    useEffect(() => {

        const fetchStatistics = async () => {
            try {
                const daily = await StatisticsAPI.getDailyStatistics()
                console.log("Daily statistics fetched:", daily);
                const weekly = await StatisticsAPI.getWeeklyStatistics()
                const monthly = await StatisticsAPI.getMonthlyStatistics()
    
                setDailyCount(daily.length > 0  ? daily[0].count : 0)
                setWeeklyStats(weekly)
                setMonthlyStats(monthly)
    
                const totalWeekly = weekly.reduce((acc, day) => acc + day.count, 0)
                const totalMonthly = monthly.reduce((acc, week) => acc + week.count, 0)
    
                setWeeklyCount(totalWeekly)
                setMonthlyCount(totalMonthly)
                console.log(dailyCount)
    
            } catch (error) {
                console.error(error)
            }
        }
        
        fetchStatistics()

        socket.on("updateReports", () => {
            fetchStatistics()
        })

        return () => {
            socket.off("updateReports");
            socket.disconnect()
        }

    }, [])

    return { dailyCount, weeklyCount, monthlyCount, weeklyStats, monthlyStats, selectedMap, setSelectedMap }
}