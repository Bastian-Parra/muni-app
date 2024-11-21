import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'
import {registerAPI, loginAPI, verifyTokenAPI} from '../api/auth.js'
export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const register = async (user) => {
        try {
            const res = await registerAPI(user)
            Cookies.set("token", res.data.token)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const login = async (user) => {
        try {
            const res = await loginAPI(user)
            Cookies.set("token", res.data.token)
            console.log(res.data)
            setIsAuthenticated(true)
            console.log(res.data)
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = async () => {
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        async function checkLogin() {
            const token = Cookies.get('token'); // Accede directamente a la cookie 'token'
            
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenAPI(token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log('Error al verificar el token:', error.response?.data || error.message)
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
            }
        }
        checkLogin();
    }, []);

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                errors,
                loading,
                register,
                login,
                logout,
                setErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

