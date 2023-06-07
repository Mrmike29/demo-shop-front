import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
