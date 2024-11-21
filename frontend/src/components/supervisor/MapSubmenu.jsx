import { useEffect } from "react";
import SupervisorMap from "../../components/supervisor/SupervisorMap.jsx"

function MapSubmenu({ selectedMap, setSelectedMap }) {
    return (
        <>
            <div className="map-submenu">
                <div>
                    <button
                        className={selectedMap === "daily" ? "active" : ""}
                        onClick={() => setSelectedMap("daily")}
                    >
                        Hoy
                    </button>
                    <button
                        className={selectedMap === "weekly" ? "active" : ""}
                        onClick={() => setSelectedMap("weekly")}
                    >
                        Esta semana
                    </button>
                    <button
                        className={selectedMap === "monthly" ? "active" : ""}
                        onClick={() => setSelectedMap("monthly")}
                    >
                        Este mes
                    </button>
                </div>
            </div>
            {selectedMap === "daily" && <SupervisorMap period="daily" />}
            {selectedMap === "weekly" && <SupervisorMap period="weekly" />}
            {selectedMap === "monthly" && <SupervisorMap period="monthly" />}
        </>
    );
}

export default MapSubmenu