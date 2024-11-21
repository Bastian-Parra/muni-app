import NavBar from "../components/NavBar.jsx";
import ContainerSection from "../components/ContainerSection.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReportsCounter from "../components/supervisor/ReportsCounter.jsx";
function StatisticsPage() {

    const {user} = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        if(user.role !== "SUPERVISOR") {
            navigate("/")
        }
    })
    return (
        <>
            <NavBar />
            <ContainerSection>
                This is statistics page

                <ReportsCounter />
            </ContainerSection>
        </>
    )
}

export default StatisticsPage;