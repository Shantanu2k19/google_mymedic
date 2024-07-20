import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-1 p-6 rounded-lg z-50 transition-opacity 
              ${isOpen ? 'border border-primary-500 opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              {/* <button className="border border-primary-500 absolute top-4 right-4 text-2xl" onClick={onClose}>
                Close&times;
              </button> */}
              {children}
            </div>
        </>
      )}
    </>
  );
};

export default Modal;
