import styled from 'styled-components';


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
`;

export const ModalClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;