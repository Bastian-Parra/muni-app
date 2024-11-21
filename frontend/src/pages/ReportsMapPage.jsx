import ContainerSection from '../components/ContainerSection.jsx'
import MapSubmenu from '../components/supervisor/MapSubmenu.jsx'
import NavBar from '../components/NavBar.jsx'
import { useFetchStatistics } from '../utils/fetchStatistics.js'

function ReportsMapPage() {

    const {selectedMap, setSelectedMap} = useFetchStatistics()
    
    return (
        <>
            <NavBar />
            <ContainerSection>
                <MapSubmenu selectedMap={selectedMap} setSelectedMap={setSelectedMap} />
            </ContainerSection>
        </>
    )
}

export default ReportsMapPage