import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, children }) => {
  //Validates if modal should open
  if (!isOpen) {
    return null;
  }

  // Returns modal component with children and event close integrated
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
