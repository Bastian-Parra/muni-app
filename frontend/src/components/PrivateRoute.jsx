import React, { useContext } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()
    
    if (loading) {
        return <div>Loading</div>
    }
    
    if (!isAuthenticated) {
        return <Navigate to='/' replace/>
    }

    return children ?  children : <Outlet />
}

export default PrivateRoute