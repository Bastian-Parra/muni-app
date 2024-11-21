import React from "react"
import Modal from "react-modal"
import '../../assets/styles/modals.css'

Modal.setAppElement("#root")

const DeleteModal = ({ isOpen, onRequestClose, title, children }) => {
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
                <div>{children}</div>
            </div>
        </Modal>
    );
};

export default DeleteModal;