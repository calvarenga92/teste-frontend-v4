import React from 'react';
import { ModalClose, ModalContent, ModalOverlay } from './style';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
  <ModalOverlay data-testid="modal" onClick={handleOverlayClick}>
      <ModalContent>
        <ModalClose data-testid="modal-close" className="modal-close" onClick={onClose}>
          &times;
        </ModalClose>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;