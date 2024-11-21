function GeneralStats({dailyCount, weeklyCount, monthlyCount, reportsCount}) {
    return (   
        <div className="general-stats">
            <h1>Estadísticas Generales</h1>
            <div className="stat-card">
                <h2>Reportes Totales</h2>
                <p>{reportsCount}</p>
            </div>
            <div className="stat-card">
                <h2>Reportes este Día</h2>
                <p>{dailyCount}</p>
            </div>
            <div className="stat-card">
                <h2>Reportes esta Semana</h2>
                <p>{weeklyCount}</p>
            </div>
            <div className="stat-card">
                <h2>Reportes este Mes</h2>
                <p>{monthlyCount}</p>
            </div>
        </div>
    )
}

export default GeneralStats;