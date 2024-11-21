import React from "react"
import Modal from "react-modal"
import '../../assets/styles/modals.css'

Modal.setAppElement("#root")

const SituationModal = ({ isOpen, onRequestClose, title, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            className="situation-modal"
            overlayClassName="custom-modal-overlay"
        >
            <div className="situation-modal-header">
                <h2>{title}</h2>
            </div>
            <div className="situation-modal-body">
                <div>{children}</div>
            </div>
            <button onClick={onRequestClose} className="close-button">&times;</button>
        </Modal>
    );
};

export default SituationModal;
