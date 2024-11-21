import { Bar } from 'react-chartjs-2'
import { generateMonthlyChartData } from "../../utils/Chart.js"

function MonthlyChart({ data }) {
    return (
        <div className='monthly-stat-chart'>
            <Bar data={generateMonthlyChartData(data, "Cantidad de Reportes")} />
        </div>
    )
}

export default MonthlyChart