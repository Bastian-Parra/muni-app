import { Bar }  from 'react-chartjs-2'


export const generateWeeklyChartData = (data, label) => {

    const translateDayOfWeek = (dayOfWeek) => {
        const days = {
            'Monday': 'Lunes',
            'Tuesday': 'Martes',
            'Wednesday': 'Miércoles',
            'Thursday': 'Jueves',
            'Friday': 'Viernes',
            'Saturday': 'Sábado',
            'Sunday': 'Domingo'
        };
        return days[dayOfWeek] || dayOfWeek;
    }

    return {
        labels: data.map(stat => `${translateDayOfWeek(stat.dayOfWeek)} (${stat.date})`),
        datasets: [
            {
                label: 'Cantidad de Reportes',
                data: data.map(stat => stat.count),
                backgroundColor: 'rgba(36, 74, 224, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
        ]
    }
}

export const generateMonthlyChartData = (monthlyStats, label) => {
    const labels = monthlyStats.map(stat => stat.date)
    const data = monthlyStats.map(stat => stat.count)

    return {
        labels: labels,
        datasets: [
            {
                label: label,
                data: data,
                backgroundColor: 'rgba(36, 74, 224, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    }
}
