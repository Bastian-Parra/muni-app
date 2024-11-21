import React, { useState, useContext, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import ContainerSection from '../components/ContainerSection.jsx'
import { useForm } from 'react-hook-form'
import '../assets/styles/login.css'
import { ErrorIcon, LoginIcon} from '../components/icons/LoginIcons.jsx'


function LoginPage() {

    const navigate = useNavigate()
    const [showError, setShowError] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm()

    const {
        user,
        login,
        isAuthenticated,
        errors: loginErrors,
        setErrors,
    } = useAuth()

    useEffect(() => {
        if(isAuthenticated) {
            if(user.role === "CENCO"){
                navigate('/cenco-dashboard')
            } else if (user.role === "SUPERVISOR"){
                navigate('/supervisor-dashboard')
            }
        }
    }, [isAuthenticated, user, navigate])

    useEffect(() => {
        if(loginErrors.length > 0) {
            setShowError(true)
            const timer = setTimeout(() => {
                setShowError(false)
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [loginErrors, setErrors])

    const onSubmit = handleSubmit( async (values) => {
        login(values)
    })

    return (
        <ContainerSection className="login-section">
            {   
                loginErrors.map((error, index) => {
                    return (
                        <div className="error-login" key={index}>
                            <ErrorIcon/>{error}
                        </div>
                    );
                })
            }
            <form className="login-form" onSubmit={onSubmit}>
                <h1>Login</h1>
                <input
                    type='email'
                    placeholder='Correo'
                    {...register('username', { required: 'El correo es requerido.' })}
                />

                {errors.username && <p className='error'><ErrorIcon/>{errors.username.message}</p>}

                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register('password', { required: 'La contraseña es requerida.' })}
                />

                {errors.password && <p className="error"><ErrorIcon/>{errors.password.message}</p>}

                <div className='radio-container'>
                    <label>
                        <input
                            type="radio"
                            value="CENCO"
                            defaultChecked
                            {...register('role')}
                        />
                        CENCO
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="SUPERVISOR"
                            {...register('role')}
                        />
                        SUPERVISOR
                    </label>
                </div>
                <button type="submit"> <LoginIcon /> Ingresar</button>
            </form>
        </ContainerSection>
    )
}

export default LoginPage