import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import WrapperSidenav from '../../components/wrapper-sidenav';
import WrapperTopbar from '../../components/wrapper-topbar';
import WrapperChatWindow from '../../components/wrapper-chat-window';
import EntityDrawer from '../../components/entity-drawer';
import Modal from '../../components/modal';
import DialogDrawer from '../../components/modal-drawer';
import {
  CenterContainer, CenterContainerBody, ExtensionAppIframe, Wrapper,
} from './styles';

let rendererRef;
let internalPointer;

const SymphonyWrapper = ({ bundle }) => {
  const [isEntityDrawerOpened, toggleEntityDrawer] = useState(false);
  const [isDialogDrawerOpened, toggleDialogDrawer] = useState(false);
  const [isEnricherClosed, setCloseEnricher] = useState(false);
  const [isAppClosed, setAppClosed] = useState(false);
  const [isModalOpened, toggleModal] = useState(false);
  const [modalOptions, setModalOptions] = useState(null);
  const [iframeKey, setIframeKey] = useState(`app.html?queryObj=${encodeURIComponent(JSON.stringify({ page: 'app', cache: 111 }))}`);

  const extensionAppRef = useRef();

  const submitHandler = (entityType, entityJson) => {
    const madeServices = window.SYMPHONY.mockHelper.getMadeServices();
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

    // getAction, called by overriden action buttons
    // Handler can be found in default-entities.js
    window.addEventListener('getAction', ({ detail }) => {
      const madeServices = window.SYMPHONY.mockHelper.getMadeServices();
      const enricherService = madeServices.find(el => el.name.includes('enricher'));
      enricherService.instance.action(detail);
    });

    // Handler can be found in default-entities.js
    window.addEventListener('openDialog', ({ detail }) => {
      setModalOptions({
        url: detail.url,
        height: detail.height,
        width: detail.width,
      });
      toggleModal(true);
    });

    window.addEventListener('keydown', ({ code }) => {
      if (code === 'Escape') {
        toggleDialogDrawer(false);
        toggleEntityDrawer(false);
      }
    });
  }, []);

  const changeTheme = () => {
    const isLight = localStorage.getItem('theme-name') === 'LIGHT';
    const themeColor = isLight ? 'DARK' : 'LIGHT';
    localStorage.setItem('theme-name', themeColor);
    setIframeKey(`app.html?queryObj=${encodeURIComponent(JSON.stringify({ page: 'app', cache: Math.random() * 100 }))}`);
    internalPointer = setInterval(() => {
      if (extensionAppRef.current.contentWindow) {
        extensionAppRef.current.contentWindow.SYMPHONY = Object.assign({}, window.SYMPHONY);
        extensionAppRef.current.contentWindow.themeColor = themeColor;
      }
    }, 1);

    window.addEventListener('openDialog', ({ detail }) => {
      setModalOptions({
        url: detail.url,
        height: detail.height,
        width: detail.width,
      });
      toggleModal(true);
    });
  };

  const onExtensionAppLoaded = () => {
    clearInterval(internalPointer);
  };

  const appIcon = bundle.iconUrl ? bundle.iconUrl : 'assets/app-icon.png';

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
          { !isAppClosed && (
          <WrapperChatWindow
            icon={appIcon}
            title={bundle.name}
            onChatClosed={() => setAppClosed(!isAppClosed)}
            onThemeChanged={changeTheme}
          >
            {iframeKey && (
            <ExtensionAppIframe
              ref={ref => extensionAppRef.current = ref}
              onLoad={onExtensionAppLoaded}
              src={iframeKey}
            />
            ) }
          </WrapperChatWindow>
          ) }
          { !isEnricherClosed && (
          <WrapperChatWindow
            title="Enricher Test"
            hasFooter
            onChatClosed={() => setCloseEnricher(!isEnricherClosed)}
          >
            <ExtensionAppIframe src="renderer-app.html" ref={(ref) => { rendererRef = ref; }} />
          </WrapperChatWindow>
          ) }
        </CenterContainerBody>
      </CenterContainer>
    </Wrapper>
  );
};

export default SymphonyWrapper;
