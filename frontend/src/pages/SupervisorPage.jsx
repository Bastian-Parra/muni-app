import NavBar from "../components/NavBar.jsx"
import { useState } from "react"
import { useReports } from "../contexts/ReportsContext.jsx"
import { useFetchStatistics } from "../utils/fetchStatistics.js"
import ContainerSection from "../components/ContainerSection.jsx"
import { Chart, registerables } from "chart.js"
import { io } from "socket.io-client"
import "../assets/styles/stats.css"
import GeneralStats from "../components/supervisor/GeneralStats.jsx"
import WeeklyChart from "../components/supervisor/WeeklyChart.jsx"
import MonthlyChart from "../components/supervisor/MonthlyChart.jsx"
import FilteredReportsChart from "../components/supervisor/FilteredReportsChart.jsx"
import ReportFilters from "../components/supervisor/ReportFilters.jsx"
import PieChart from "../components/supervisor/PieChart.jsx"
import SituationMenu from "../components/supervisor/SituationMenu.jsx"

Chart.register(...registerables)

function SupervisorPage() {

    const {dailyCount, weeklyCount, monthlyCount, weeklyStats, monthlyStats} = useFetchStatistics()
    const {reportsCount} = useReports()

    const [selectedDay, setSelectedDay] = useState("Lunes");
    const [selectedShift, setSelectedShift] = useState("MAÑANA");

    const [selectedSituation, setSelectedSituation] = useState("");
    const [situationDetails, setSituationDetails] = useState(""); 


    const openModal = (situation) => {
        setSelectedSituation(situation)
        setSituationDetails(`Detalles sobre la situación ${situation}`)
    }
    return (
        <>
            <NavBar />
            <ContainerSection>
                <div>
                    <GeneralStats dailyCount={dailyCount} weeklyCount={weeklyCount} monthlyCount={monthlyCount} reportsCount={reportsCount} />
                    <div className="container-charts">
                        <WeeklyChart data={weeklyStats} className="weekly-chart"/>
                        <div className="pie-chart-container">
                            <SituationMenu onSituationSelect={openModal} />
                            <PieChart selectedSituation={selectedSituation} onSituationSelect={openModal} />
                        </div>
                    </div>
                    <MonthlyChart data={monthlyStats} />
                </div>
                <ReportFilters selectedDay={selectedDay} setSelectedDay={setSelectedDay} selectedShift={selectedShift} setSelectedShift={setSelectedShift} />

                <div className="filtered-container">
                    <FilteredReportsChart selectedDay={selectedDay} selectedShift={selectedShift} />
                </div>

            </ContainerSection>
        </>
    )
}

export default SupervisorPage