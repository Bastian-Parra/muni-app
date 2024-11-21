import React, {useState} from "react";
import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const customIcon = L.icon({
    iconUrl: "../../../public/marker-icon.png",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34], 
})

function LocationMarker({onLocationSelect}) {
    const [position, setPosition] = useState(null)

    const map = useMapEvents({
        click: (e) => {
            setPosition(e.latlng)
            onLocationSelect(e.latlng)
        }
    })

    return position === null ? null : ( 
        <Marker position={position} icon={customIcon} />
    )
}

function MapSelector({ location, onLocationSelect}) {
    return (
        <MapContainer center={ location || [-32.791174287507445, 	-71.52095317840578]} zoom={14} style={{ height: "400px", width: "auto" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={location} onLocationSelect={onLocationSelect} />
        </MapContainer>
    )
}

export default MapSelector