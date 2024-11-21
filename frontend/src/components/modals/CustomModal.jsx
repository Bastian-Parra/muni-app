import React from "react"
import Modal from "react-modal"
import '../../assets/styles/modals.css'

Modal.setAppElement("#root")

const CustomModal = ({ isOpen, onRequestClose, title, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
        >
            <div className="modal-header">
                <h2>{title}</h2>
            </div>
            <div className="modal-body">
                <div className="checkmark-circle">
                    <div className="checkmark"></div>
                </div>
                <div>{children}</div>
            </div>
            <button onClick={onRequestClose} className="close-button">&times;</button>
        </Modal>
    );
};

export default CustomModal;
