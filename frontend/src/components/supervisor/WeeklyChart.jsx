import {Bar} from 'react-chartjs-2'
import { generateWeeklyChartData } from '../../utils/Chart.js'
import "../../assets/styles/stats.css"

function WeeklyChart({ data }) {
    return (
        <div className='chart-container-bar'>
            <h2>Reportes x Dia Semana</h2>
            <Bar style={{ marginBottom: '50px', height: '300px' }} data={generateWeeklyChartData(data, "Reportes")} />
        </div>
    )
}

export default WeeklyChart