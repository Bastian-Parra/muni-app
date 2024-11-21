import '../assets/styles/login.css'

function ErrorComponent({ children }) {
    return (
        <p className="error">
            {children}
        </p>
    )
}

export default ErrorComponent