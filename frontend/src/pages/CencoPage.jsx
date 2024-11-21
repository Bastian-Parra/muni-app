import '../assets/styles/cenco.css'
import NavBar from "../components/NavBar.jsx";
import ContainerSection from "../components/ContainerSection.jsx"
import { AuthContext } from "../contexts/AuthContext.jsx";
import React, { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { createReport, getAllReports } from "../api/reports.js";
import CustomModal from '../components/modals/CustomModal.jsx'
import io from 'socket.io-client'
import { useNavigate } from "react-router-dom";
import MapSelector from "../components/cenco/MapSelector.jsx";
import SituationSelector from "../components/cenco/SituationSelector.jsx";
import { AddIcon } from "../components/icons/CencoIcons.jsx"

const socket = io('http://localhost:4000') // servidor backend


function CencoPage() {

    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [errores, setErrores] = useState([])
    const [reports, setReports] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [location, setLocation] = useState(null)
    const [locationInput, setLocationInput] = useState("")
    const [userReports, setUserReports] = useState([])
    const [showSituationModal, setShowSituationModal] = useState(false)
    const [selectedSituation, setSelectedSituation] = useState("")
    const [isDerived, setIsDerived] = useState(false)
    const [selectedInstitution, setSelectedInstitution] = useState("")

    const handleOpenSituationModal = () => setShowSituationModal(true)
    const handleCloseSituationModal = () => setShowSituationModal(false)
    const handleSelectSituation = (situation) => {
        setSelectedSituation(situation)
        handleCloseSituationModal()
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (user.role !== "CENCO") {
            navigate("/")
        }
    })    
    const fetchAllReports = async () => {
        try {
            const res = await getAllReports()
            const allReports = res.data
            setReports(res.data)

            const filteredReports = allReports.filter(report => report.reporter_id === user.id)
            setUserReports(filteredReports)
        } catch (error) {
            console.error("Error fetching all reports")
        }
    }

    const handleCloseModal = () => setShowModal(false)


    useEffect(() => {
        fetchAllReports()

        socket.on('updateReports', () => {
            fetchAllReports()
        })

        return () => {
            socket.off('updateReports')
        }

    }, [])

    const onSubmit = async (data) => {
        try {
            const now = new Date();
            const hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const currentTime = `${String(hours).padStart(2, '0')}:${minutes}`;

            let shift;

            if (hours >= 6 && hours < 12) {
                shift = "MAÑANA";
            } else if (hours >= 12 && hours < 18) {
                shift = "TARDE";
            } else if (hours >= 18 && hours < 24) {
                shift = "NOCHE";
            } else {
                shift = "MADRUGADA";
            }

            const derivedInstitution = isDerived ? selectedInstitution : "Seguridad Ciudadana"

            const formData = {
                report_date: new Date().toLocaleDateString(),
                shift: shift,
                radio_operator: data.radio_operator,
                monitoring_operator_1: data.monitoring_operator_1,
                monitoring_operator_2: data.monitoring_operator_2,
                mobiles: data.mobiles,
                quadrant: data.quadrant,
                portables: data.portables,
                location: data.location,
                call_time: currentTime,
                contact: data.contact,
                name: data.name,
                situation: selectedSituation,
                derived_report: derivedInstitution,
                closure: data.closure,
                latitude: location ? location.lat : null,
                longitude: location ? location.lng : null,
                reporter_id: user.id
            }

            await createReport(formData)

            setShowModal(true)
            reset()
            setLocation(null);
            setLocationInput("");
            setIsDerived(false)
            setSelectedInstitution("")

        } catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <NavBar />
            <ContainerSection>
                <form onSubmit={handleSubmit(onSubmit)} className="reports-form">
                    <h2> <AddIcon />Rellenar Formulario</h2>

                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="radio_operator">Operador Radial</label>
                            <input
                                type="text"
                                id="radio_operator"
                                {...register('radio_operator', { required: 'El operador radial es requerido.' })}
                                placeholder="Operador Radial"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="monitoring_operator_1">Operador de Monitoreo 1</label>
                            <input
                                type="text"
                                id="monitoring_operator_1"
                                {...register('monitoring_operator_1')}
                                placeholder="Operador de Monitoreo 1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="monitoring_operator_2">Operador de Monitoreo 2</label>
                            <input
                                type="text"
                                id="monitoring_operator_2"
                                {...register('monitoring_operator_2')}
                                placeholder="Operador de Monitoreo 2"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mobiles">Móviles</label>
                            <input
                                type="text"
                                id="mobiles"
                                {...register('mobiles')}
                                placeholder="Móviles"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quadrant">Cuadrante</label>
                            <input
                                type="text"
                                id="quadrant"
                                {...register('quadrant')}
                                placeholder="Cuadrante"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="portables">Portátiles</label>
                            <input
                                type="text"
                                id="portables"
                                {...register('portables')}
                                placeholder="Portátiles"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact">Contacto</label>
                            <input
                                type="text"
                                id="contact"
                                {...register('contact')}
                                placeholder="Contacto"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Nombre de Informante</label>
                            <input
                                type="text"
                                id="name"
                                {...register('name')}
                                placeholder="Nombre"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location-input">Ubicación</label>
                            <input
                                type="text"
                                id="location-input"
                                {...register('location')}
                                placeholder="Ubicacion"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="derived-report">¿Reporte Derivado?</label>
                            <select
                                id="derived-report"
                                {...register("derived-report")}
                                onChange={(e) => setIsDerived(e.target.value === "yes")}
                            >
                                <option value="no">No</option>
                                <option value="yes">Si</option>
                            </select>
                        </div>

                        {isDerived && (
                            <div className="form-group">
                                <label htmlFor="institution">Seleccione Institución</label>
                                <select
                                    id="institution"
                                    value={selectedInstitution}
                                    onChange={(e) => setSelectedInstitution(e.target.value)}
                                >
                                    <option value="Carabineros">Carabineros</option>
                                    <option value="PDI">PDI</option>
                                    <option value="Armada">Armada</option>
                                    <option value="Bomberos">Bomberos</option>
                                    <option value="Ambulancia">Ambulancia</option>
                                </select>
                            </div>
                        )}

                        <div className="form-group large-input">
                            <label htmlFor="situation">Situación</label>
                            <input
                                type="text"
                                id="situation"
                                value={selectedSituation}
                                placeholder="Situación"
                                readOnly
                                onClick={handleOpenSituationModal}
                            />
                        </div>

                        <div className="form-group large-input">
                            <label htmlFor="closure">Cierre</label>
                            <input
                                type="text"
                                id="closure"
                                {...register('closure')}
                                placeholder="Cierre"
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Seleccione Ubicación en el Mapa</label>
                        <MapSelector className="map-container" onLocationSelect={setLocation} />
                    </div>
                    <button id="btn-create-report" type="submit">Generar Reporte</button>
                </form>

                <SituationSelector
                    isOpen={showSituationModal}
                    onRequestClose={handleCloseSituationModal}
                    onSelectSituation={handleSelectSituation}
                />
                <CustomModal isOpen={showModal} onRequestClose={handleCloseModal} title={"Éxito"}>¡Reporte creado correctamente!</CustomModal>
            </ContainerSection>
        </>
    )
}

export default CencoPage;