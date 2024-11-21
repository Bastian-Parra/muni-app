import React, {useEffect, useState} from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import StatisticsAPI from '../../api/statistics.js'
import '../../assets/styles/stats.css'
import { convertTo12HourFormat } from "../../utils/utils.js";
import { convertDate } from '../../utils/ConvertTime.js';

function SupervisorMap({ period }) {
    const [coordinates, setCoordinates] = useState([])
    const detailMsg = "Ver detalles"
    useEffect(() => {

        const fetchCoordinates = async () => {
            try {
                const res = await StatisticsAPI.getReportsCoordinates(period)
                setCoordinates(res)
            } catch (error) {
                console.error(error)
            }
        }
        
        fetchCoordinates()
    }, [period])

    useEffect(() => {
    }, [coordinates])

    return(
        <MapContainer className="stats-map" center={[-32.791174287507445, 	-71.52095317840578]} zoom={13} style={{height: "500px", width: "100%"}}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
             {coordinates && coordinates.length > 0 ? (
                coordinates.map((coord, index) => (
                    <div key={index}>
                        <Marker key={index} position={[coord.latitude, coord.longitude]}>

                            <Popup>
                                <div>
                                    <p><strong>Situación: </strong> {coord.situation}</p>
                                    <p><strong>Hora Llamada: </strong> {convertTo12HourFormat(coord.call_time)}</p>
                                    <p><strong>Fecha: </strong> {convertDate(coord.report_date)}</p>
                                    <p><strong>Ubicación: </strong> {coord.location}</p>
                                    <p><a href={`/reports/${coord.id}`} id='detail-map-btn'>{detailMsg}</a></p>
                                </div>
                            </Popup>
                        </Marker>
                    </div>
                ))
            ) : (
                <p>No hay coordenadas disponibles.</p>
            )}
        </MapContainer>
    )
}

export default SupervisorMap