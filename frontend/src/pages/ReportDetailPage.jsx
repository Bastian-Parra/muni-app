import { useParams, useNavigate } from "react-router-dom"
import React, {useEffect, useState} from "react"
import { getReportById } from "../api/reports"
import NavBar from "../components/NavBar.jsx"
import ContainerSection from "../components/ContainerSection.jsx"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "../assets/styles/report-detail.css"
import {convertDate, convertTime} from "../utils/ConvertTime.js"
import {DateIcon, HourIcon, DetailIcon} from "../components/icons/SupervisorIcons.jsx"
 

function ReportDetailPage () {

    const {id} = useParams()
    const [report, setReport] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getReportById(id)
                setReport(response.data)
                setLoading(false)
            } catch (error) {
                setError("No se pudo cargar el reporte.")
                setLoading(false)
            }
        }

        fetchReport()
    }, [id, navigate])

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <NavBar />
            <ContainerSection>
                <div className="report-detail-header">
                    <h2> <DetailIcon />Detalles del Reporte</h2>
                    <div className="date-time-container">
                        <p><HourIcon />{convertTime(report.call_time)}</p>
                        <p><DateIcon />{convertDate(report.report_date)}</p>
                    </div>
                </div>
                {report ? (
                    <div className="report-detail-container">
                        <div className="input-group">
                            <label htmlFor="radio_operator">Operador Radial</label>
                            <input type="text" name="radio_operator" readOnly value={report.radio_operator} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="monitoring_operator_1">Operador de Monitoreo 1</label>
                            <input type="text" name="monitoring_operator_1" readOnly value={report.monitoring_operator_1} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="monitoring_operator_2">Operador de Monitoreo 2</label>
                            <input type="text" name="monitoring_operator_2" readOnly value={report.monitoring_operator_2} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="mobiles">Moviles</label>
                            <input type="text" name="mobiles" readOnly value={report.mobiles} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="quadrant">Cuadrante</label>
                            <input type="text" name="quadrant" readOnly value={report.quadrant} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="portables">Portatiles</label>
                            <input type="text" name="portables" readOnly value={report.portables} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="contant">Contacto</label>
                            <input type="text" name="contact" readOnly value={report.contact} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="name">Nombre Informante</label>
                            <input type="text" name="name" readOnly value={report.name} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="responder">Concurrido por</label>
                            <input type="text" name="responder" readOnly value={report.derived_report} disabled/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="situation">Situacion</label>
                            <input type="text" name="situation" readOnly value={report.situation} disabled/>
                        </div>
                        <div className="input-group medium-input">
                            <label htmlFor="location">Ubicacion Textual</label>
                            <input type="text" name="location" readOnly value={report.location} disabled/>
                        </div>
                        <div className="input-group large-input">
                            <label htmlFor="closure">Cierre</label>
                            <input type="text" name="closure" readOnly value={report.closure} disabled/>
                        </div>
                        <div className="input-group large-input">
                            <MapContainer className="map-container"
                                center={[report.latitude, report.longitude]} zoom={16} style={{ height: "400px", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                />
                                <Marker position={[report.latitude, report.longitude]} />

                            </MapContainer>
                        </div>
                    </div>
                    
                ) : (
                    <p>No se encontró el reporte.</p>
                )}
            </ContainerSection>
    </>
    )
}

export default ReportDetailPage