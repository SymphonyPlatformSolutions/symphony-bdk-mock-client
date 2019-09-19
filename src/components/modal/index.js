import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  IconClose, ModalContainer, ModalIframe, ModalWrapper,
} from './styles';

let internalPointer;

function Modal({ modalOptions, closeHandler }) {
  const iframeRef = useRef();

  useEffect(() => {
    window.SYMPHONY.mockHelper.setModalHandler(closeHandler);
    internalPointer = setInterval(() => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow.SYMPHONY = Object.assign({}, window.SYMPHONY);
      }
    }, 1);
  }, []);

  const closeIframe = () => {
    clearInterval(internalPointer);
  };
  return (
    <ModalContainer>
      <ModalWrapper>
        <IconClose size={25} bold onClick={closeHandler} />
        <ModalIframe
          width={modalOptions.width}
          height={modalOptions.height}
          ref={iframeRef}
          src={modalOptions.url}
          onLoad={closeIframe}
        />
      </ModalWrapper>
    </ModalContainer>
  );
}

Modal.propTypes = {
  modalOptions: PropTypes.object.isRequired,
  closeHandler: PropTypes.func.isRequired,
};


export default Modal;
