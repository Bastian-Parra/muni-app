import "../../assets/styles/modals.css"

function SuccessMessage({ isOpen, onClose }) {
    return (
        isOpen && (
            <div className="success-message">
                <p>Reporte eliminado con éxito.</p>
            </div>
        )
    );
}

export default SuccessMessage;