import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import WrapperSidenav from '../../components/wrapper-sidenav';
import WrapperTopbar from '../../components/wrapper-topbar';
import WrapperChatWindow from '../../components/wrapper-chat-window';
import EntityDrawer from '../../components/entity-drawer';
import Modal from '../../components/modal';
import DialogDrawer from '../../components/modal-drawer';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  display: flex;
  font-family: SymphonyLato,"Hiragino Kaku Gothic Pro",Meiryo,"Yu Gothic Medium",sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  border-left: 2px solid #E0E4EB;
  border-right: 2px solid #E0E4EB;
  flex-direction: column;
`;

const CenterContainerBody = styled.div`
  display: grid;
  grid-auto-rows: auto auto;
  height: 100%;
  background: #e3e5e8;
  
  @media (min-width: 1300px) {
    grid-auto-flow: column;
  }
`;

const ExtensionAppIframe = styled.iframe`
  width: 100%;
  height: calc(100% - 5px);
  border: none;
`;

let rendererRef;
let internalPointer;

const SymphonyWrapper = () => {
  const [isEntityDrawerOpened, toggleEntityDrawer] = useState(false);
  const [isDialogDrawerOpened, toggleDialogDrawer] = useState(false);

  const [isModalOpened, toggleModal] = useState(false);
  const [modalOptions, setModalOptions] = useState(null);

  const extensionAppRef = useRef();

  const submitHandler = (entityType, entityJson) => {
    const { madeServices } = window.SYMPHONY.services;
    let errorMessage;
    let template;
    let sentJson = entityJson;

    if (!madeServices || !madeServices.length) {
      console.log('No services were made, so nothing to render the entity!');
      errorMessage = 'No services were made, so nothing to render the entity!';
    }

    if (madeServices) {
      const enricherService = madeServices.find(el => el.name.includes('enricher'));
      if (!enricherService) {
        console.log('No enricher service made!');
        errorMessage = 'No enricher service made!';
      } else {
        try {
          template = enricherService.instance.render(entityType, entityJson);
        } catch (e) {
          template = {
            template: `<messageML><i>Error on enricher</i><br />
          <i>Tried to render</i> <b>${entityType}</b><br /><i>with the following Json:</i> <br />
          <pre>${JSON.stringify(entityJson).replace(/\\n/g, '<br />')}</pre>
          <hr />
          <i>Caught error:</i> ${e}</messageML>`,
          };
          sentJson = {};
        }
      }
    }

    if (errorMessage) {
      template = { template: `<messageML><i>Renderer error:</i> ${errorMessage}<br />Please reload the webpage, and try again.</messageML>` };
      sentJson = {};
    }

    rendererRef.contentWindow.postMessage({
      call: 'sendValue',
      value: {
        entityType,
        template,
        entityJson: sentJson,
      },
    }, '*');
  };

  useEffect(() => {
    internalPointer = setInterval(() => {
      if (extensionAppRef.current.contentWindow) {
        extensionAppRef.current.contentWindow.SYMPHONY = Object.assign({}, window.SYMPHONY);
      }
    }, 1);

    window.addEventListener('openDialog', ({ detail }) => {
      toggleModal(true);
      setModalOptions({
        url: detail.url,
        height: detail.height,
        width: detail.width,
      });
    });

    window.addEventListener('keydown', ({ code }) => {
      if (code === 'Escape') {
        toggleDialogDrawer(false);
        toggleEntityDrawer(false);
      }
    });
  }, []);


  const onExtensionAppLoaded = () => {
    clearInterval(internalPointer);
  };

  return (
    <Wrapper>
      {ReactDOM.createPortal(<EntityDrawer
        closeHandler={() => toggleEntityDrawer(false)}
        submitHandler={submitHandler}
        isOpen={isEntityDrawerOpened}
      />, document.body)}
      {ReactDOM.createPortal(<DialogDrawer
        isOpen={isDialogDrawerOpened}
        closeHandler={() => toggleDialogDrawer(false)}
      />, document.body)}
      <WrapperSidenav
        toggleEntityDrawer={() => toggleEntityDrawer(true)}
        toggleDialogDrawer={() => toggleDialogDrawer(true)}
      />
      { isModalOpened && <Modal modalOptions={modalOptions} closeHandler={() => toggleModal(false)} />}
      <CenterContainer>
        <WrapperTopbar />
        <CenterContainerBody>
          <WrapperChatWindow title="Symphony News">
            <ExtensionAppIframe
              ref={extensionAppRef}
              onLoad={onExtensionAppLoaded}
              src="app.html"
            />
          </WrapperChatWindow>
          <WrapperChatWindow hasFooter title="Enricher Test">
            <ExtensionAppIframe src="renderer-app.html" ref={(ref) => { rendererRef = ref; }} />
          </WrapperChatWindow>
        </CenterContainerBody>
      </CenterContainer>
    </Wrapper>
  );
};

export default SymphonyWrapper;
