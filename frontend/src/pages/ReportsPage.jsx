import NavBar from "../components/NavBar.jsx";
import ContainerSection from "../components/ContainerSection.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getAllReports } from "../api/reports.js";
import { convertTo12HourFormat } from "../utils/utils.js";
import { deleteReport } from "../api/reports.js";
import "../assets/styles/reports.css"
import DeleteModal from "../components/modals/DeleteModal.jsx";
import SuccessMessage from "../components/modals/SuccessModal.jsx";
import { DownloadIcon, DeleteIcon, MoreIcon } from "../components/icons/SupervisorIcons.jsx"
import { jsPDF } from "jspdf"
import { Tooltip } from 'react-tooltip';
import { convertDate } from "../utils/ConvertTime.js";
import "jspdf-autotable";


const socket = io('http://localhost:4000')

function ReportsPage() {

    const navigate = useNavigate()

    const { user } = useAuth()

    const [reports, setReports] = useState([])
    const [searchTerm , setSearchTerm] = useState("")
    const [searchParams , setSearchParams] = useSearchParams()
    const [showModal, setShowModal] = useState(false)	
    const [reportToDelete, setReportToDelete] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [sortKey, setSortKey] = useState("date")
    const [reportsPerPage, setReportsPerPage] = useState(15)
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedSituation, setSelectedSituation] = useState("");
    const [selectedInstitutionType, setSelectedInstitutionType] = useState("")

    const fetchAllReports = async () => {
        try {
            const res = await getAllReports()
            setReports(res.data)
        } catch (error) {
            console.error("Error fetching all reports")
        }
    }

    useEffect(() => {
        if(user.role !== "SUPERVISOR") {
            return navigate('/')
        }

        fetchAllReports()

        socket.on('updateReports', () => {
            fetchAllReports()
        })

        return () => {
            socket.off('updateReports')
        }
    }, [])

    // filtrado combinado de reportes

    const filteredReports = reports.filter(report => {
        const reportDate = new Date(report.report_date)
        return (
            report.radio_operator.toLowerCase().includes(searchTerm.toLowerCase()) &&
            report.shift.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!startDate || reportDate >= new Date(startDate)) &&
            (!endDate || reportDate <= new Date(endDate)) &&
            report.location.toLowerCase().includes(selectedLocation.toLowerCase()) &&
            report.situation.toLowerCase().includes(selectedSituation.toLowerCase()) &&
            (selectedInstitutionType === "" || report.derived_report === selectedInstitutionType)
        )
    })


    // orderar reportes
    const sortedReports = [...filteredReports].sort((a,b) => {
        if(sortKey === "date") {
            return new Date(a.report_date) - new Date(b.report_date)
        } else if (sortKey === "shift") {
            return a.shift.localeCompare(b.shift)
        }
        return 0
    })

    const totalPages = Math.ceil(sortedReports.length / reportsPerPage)

    const currentPage = parseInt(searchParams.get('page')) || 1

    const indexOfLastReport = currentPage * reportsPerPage
    const indexOfFirstReport = indexOfLastReport - reportsPerPage
    const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport)

    const paginate = (pageNumber) => setSearchParams({ page: pageNumber })

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setSearchParams({ page: 1})
    }

    const handleDetailsClick = (reportId) => {
        navigate(`/reports/${reportId}`)
    }
    
    const handleDeleteClick = (reportId) => {
        setShowModal(true)
        setReportToDelete(reportId)
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteReport(reportToDelete)
            socket.emit("deleteReport", reportToDelete)
            setShowModal(false)
            setReportToDelete(null)
            setShowSuccessMessage(true)
            fetchAllReports()
            setTimeout(() => setShowSuccessMessage(false), 3000)
        } catch (error) {
            console.log("Error al eliminar el reporte", error)
            setShowModal(false)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setReportToDelete(null)
    }


    const generatePDF = () => {
        const doc = new jsPDF()

        doc.setFontSize(15)
        doc.text("Reportes Filtrados", 14, 22)

        const filteredData = sortedReports.map(report => [
            convertDate(report.report_date),
            report.shift,
            report.location,
            convertTo12HourFormat(report.call_time),
            report.derived_report
          ]);  

        const columns = ["Fecha", "Turno", "Ubicación", "Hora Llamada", "Institución"];
        
        doc.autoTable({
            head: [columns],
            body: filteredData,
            startY: 30,
            theme: 'grid'
        })

        doc.save("reportes-filtrados.pdf")
    }
    return (
        <>
            <NavBar />
            <ContainerSection>
                <div className="search-container">
                    <label htmlFor="">Desde</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <label htmlFor="">Hasta</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                    <input
                        type="text"
                        placeholder="Filtrar por Ubicación"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    />

                    <select
                    value={selectedInstitutionType}
                    onChange={(e) => setSelectedInstitutionType(e.target.value)}
                    >
                        <option value="">Filtrar por institucion</option>
                        <option value="Carabineros">Carabineros</option>
                        <option value="PDI">PDI</option>
                        <option value="Armada">Armada</option>
                        <option value="Bomberos">Bomberos</option>
                        <option value="Ambulancia">Ambulancia</option>
                        <option value="Seguridad Ciudadana">Seguridad Ciudadana</option>
                    </select>

                    <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
                        <option value="date">Ordenar por Fecha</option>
                        <option value="shift">Ordenar por Turno</option>
                    </select>

                    <select value={reportsPerPage} onChange={(e) => setReportsPerPage(parseInt(e.target.value))}>
                        <option value={10}>10 filas</option>
                        <option value={15}>15 filas</option>
                        <option value={20}>20 filas</option>
                        <option value={50}>50 filas </option>
                    </select>
                </div>
                <div className="download-pdf-container">
                    <button onClick={generatePDF} className="btn-download-pdf" data-tooltip-id="download-tooltip">
                        Descargar PDF <DownloadIcon />
                    </button>
                    <Tooltip id="download-tooltip" content="Al hacer clic, estarás descargando los reportes que hayas filtrado con anterioridad. Si no filtraste nada, se descargarán todos los reportes creados hasta la fecha." />
                </div>
                <div className="reports-list">
                    {reports.length === 0 ? (
                        <p>No hay reportes disponibles.</p>
                    ) : (
                        <>
                        <table className="reports-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Turno</th>
                                    <th>Ubicación</th>
                                    <th>Hora llamada</th>
                                    <th>Institucion Derivada</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentReports.map(report => (
                                    <tr key={report.id}>
                                        <td>{convertDate(report.report_date)}</td>
                                        <td>{report.shift}</td>
                                        <td>{report.location}</td>
                                        <td>{convertTo12HourFormat(report.call_time)}</td>
                                        <td>{report.derived_report}</td>
                                        <td>
                                            <div className="action-container">
                                                <button id="detail-btn" data-tooltip-id="detail-tooltip" onClick={() => handleDetailsClick(report.id)}>
                                                    <MoreIcon />
                                                </button>
                                                <Tooltip id="detail-tooltip" content="Ver detalles" />
                                                {user.id_rol === 1 && (
                                                    <>
                                                        <button id="delete-btn" data-tooltip-id="delete-tooltip" onClick={() => handleDeleteClick(report.id)}>
                                                            <DeleteIcon />
                                                        </button>
                                                        <Tooltip id="delete-tooltip" content="Eliminar reporte" />
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => paginate(index + 1)}
                                            className={currentPage === index + 1 ? 'active' : ''}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                        </div>
                        </>
                    )}
                </div>
            </ContainerSection>

            <DeleteModal isOpen={showModal} onRequestClose={handleCloseModal} title="Confirmar Eliminacion" >
                <div className="container-delete-modal">
                    <p>¿Estás seguro de que deseas eliminar este reporte? </p>
                    <button className="btn-delete yes" onClick={handleConfirmDelete}>Si, eliminar</button>
                    <button className="btn-delete no" onClick={handleCloseModal}>No, cancelar</button>
                </div>
            </DeleteModal>

            <SuccessMessage isOpen={showSuccessMessage} onClose={() => setShowSuccessMessage(false)}/>
        </>
    )
}

export default ReportsPage;