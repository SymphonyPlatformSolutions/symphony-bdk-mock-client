import styled from 'styled-components';
import { Close } from 'styled-icons/evil';

export const IconClose = styled(Close)`
  margin-left: 8px;
  position: absolute;
  right: 5px;
  top: 5px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #000000cc;
  z-index: 99999;
`;

export const ModalWrapper = styled.div`
  position: absolute;
  min-width: 530px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid #d8dee8;
`;

export const ModalIframe = styled.iframe`
  border: none;
`;
