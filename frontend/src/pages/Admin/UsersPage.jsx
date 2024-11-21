import ContainerSection from "../../components/ContainerSection"
import NavBar from "../../components/NavBar.jsx"
import { getAllUsers } from "../../api/users.js"
import { useState, useEffect } from "react"
import "../../assets/styles/users.css"
function UsersPage() {

    const [users, setUsers] = useState([])

    const fetchAllUsers = async () => {
        try {
            const users = await getAllUsers()
            setUsers(users.data)
        } catch (error) {
            console.error("Error fetching all users")
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <>
            <NavBar />
            <ContainerSection>
                <h1>Users Control Panel Page</h1>

                <h3>Cuentas Creadas Actualmente: </h3>
                <div className="users-container">
                    <ul>
                        <h4>Cuentas tipo CENCO</h4>
                        {users.filter((user) => user.role === "CENCO").map((user) => (
                            <li key={user.id}>{user.username}</li>
                        ))}
                    </ul>

                    <ul>
                        <h4>Cuentas tipo SUPERVISOR</h4>
                        {users.filter((user) => user.role === "SUPERVISOR").map((user) => (
                            <li key={user.id}>
                                {user.username} {user.id_rol === 1 && <b>Admin</b>}
                            </li>
                        ))}
                    </ul>
                </div>
            </ContainerSection>
        </>
    )
}

export default UsersPage