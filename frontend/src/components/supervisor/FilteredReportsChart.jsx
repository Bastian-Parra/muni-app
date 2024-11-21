import React, {useState, useEffect} from "react"
import StatisticsAPI from "../../api/statistics.js"
import {Bar} from "react-chartjs-2"
import { truncateText } from "../../utils/utils.js";

// ======================================================== //

const FilteredReportsChart = ({ selectedDay, selectedShift }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: 'rgba(36, 74, 224, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        const fetchFilteredReports = async () => {
            try {
                const reports = await StatisticsAPI.getFilteredReports(selectedDay, selectedShift)

                let situations = reports.map(report => truncateText(report.situation, 30));
                let counts = reports.map(report => report.count);

                setChartData({
                    labels: situations,
                    datasets: [{
                        label: `Cantidad de Reportes (${selectedShift})`,
                        data: counts,
                        backgroundColor: 'rgba(36, 74, 224, 0.7)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                })

            } catch (error) {
                console.error("Error fetching filtered reports: ", error)
            }
        }

        fetchFilteredReports()

    }, [selectedDay, selectedShift])

    return (
        <Bar
            data={chartData}
            options={{
                scales: {
                    x: { title: { display: true, text: "Situacion" } },
                    y: { title: { display: true, text: "Cantidad de Reportes" }, beginAtZero: true },
                }
            }}
        />
    )
}

export default FilteredReportsChart