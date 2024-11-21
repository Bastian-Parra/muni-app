import React from "react"
import "../../assets/styles/singularComponents.css"
const ReportFilters = ({ selectedDay, setSelectedDay, selectedShift, setSelectedShift }) => {
    return (
        <div className="chart-filters">
            <label>Dia Semana</label>
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
            </select>
            
            <label>Rango</label>
            <select value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)}>
                <option value="MAÑANA">Mañana</option>
                <option value="TARDE">Tarde</option>
                <option value="NOCHE">Noche</option>
                <option value="MADRUGADA">Madrugada</option>
            </select>
        </div>
    )
}

export default ReportFilters