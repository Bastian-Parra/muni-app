import '../assets/styles/navbar.css'
import { AuthContext } from '../contexts/AuthContext.jsx'
import React, { useContext, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useLocation } from 'react-router-dom'
import { MenuIcon } from '../components/icons/MenuIcon.jsx'
import DeleteModal from './modals/DeleteModal.jsx'
import { AdminIcon, StatsIcon, ReportsIcon, LogoutIcon, MapIcon, MoreIcon, UsersIcon } from './icons/NavIcons.jsx'

function NavBar() {

    const { logout, user } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleCloseModal = () => {
        setShowModal(false)
    }	

    const handleConfirmLogout = () => {
        logout()
        setShowModal(false)
    }

    const handleLogoutClick = () => {
        setShowModal(true)
    }

    const location = useLocation()

    return (
        <nav>
            <div>
                <label>Dirección de Seguridad Pública</label>
                <div className="hamburguer" onClick={() => setMenuOpen(!menuOpen)}>
                    <MenuIcon />
                </div>
                <ul className={menuOpen ? 'show' : ''}>
                    {user.role === "SUPERVISOR" && (
                        <>
                            <li>
                                <a href="/supervisor-dashboard" className={location.pathname === "/supervisor-dashboard" ? "active" : ""}>
                                    <StatsIcon /> Estadísticas
                                </a>
                            </li>
                        <li>
                                <a href="/reports" className={location.pathname === "/reports" ? "active" : ""} >
                                    <ReportsIcon /> Reportes
                                </a>
                            </li>
                            <li>
                                <a href="/reports-map" className={location.pathname === "/reports-map" ? "active" : ""}>
                                    <MapIcon /> Mapa de Reportes
                                </a>
                            </li>
                        </>
                    )}
                    {user.id_rol === 1 && (
                        <li>
                            <a href="#" className="dropdown-toggle">
                                <AdminIcon /> Admin <MoreIcon />
                            </a>
                            <ul className='dropdown'>
                                <li><a href="/admin/users"> <UsersIcon /> Usuarios</a></li>
                            </ul>
                        </li>
                    )}
                    <li>
                        <a href="#" onClick={handleLogoutClick}>
                            <LogoutIcon /> Salir 
                        </a>
                    </li>
                </ul>
            </div>

            <DeleteModal isOpen={showModal} onRequestClose={handleCloseModal} title="Confirmar Cerrar Sesión" >
                <div className="container-delete-modal">
                    <p> ¿Estás seguro de que deseas salir? </p>
                    <button className="btn-delete yes" onClick={handleConfirmLogout}>Si, salir</button>
                    <button className="btn-delete no" onClick={handleCloseModal}>No, continuar</button>
                </div>
            </DeleteModal>
        </nav>
    )
}

export default NavBar