import React from 'react'
import { useReports } from '../../contexts/ReportsContext.jsx'

const ReportsCounter = () => {
    const { reportsCount } = useReports()
    return(
        <div>
            {reportsCount} reports found
        </div>
    )
}

export default ReportsCounter