import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import WrapperSidenav from '../../components/wrapper-sidenav';
import WrapperTopbar from '../../components/wrapper-topbar';
import WrapperChatWindow from '../../components/wrapper-chat-window';
import EntityDrawer from '../../components/entity-drawer';
import Modal from '../../components/modal';
import DialogDrawer from '../../components/modal-drawer';
import {
  CenterContainer,
  CenterContainerBody,
  ExtensionAppIframe,
  Wrapper,
} from './styles';

let rendererRef;
let internalPointer;

const THEME_SIZES = ['xsmall', 'small', 'normal', 'large'];

const SymphonyWrapper = ({ bundle }) => {
  const [isEntityDrawerOpened, toggleEntityDrawer] = useState(false);
  const [isDialogDrawerOpened, toggleDialogDrawer] = useState(false);
  const [isRendererOpen, toggleRendererOpen] = useState(
    window.localStorage.getItem('mockRendererOpen') === null
      ? true
      : window.localStorage.getItem('mockRendererOpen') === 'true',
  );
  const [isAppOpen, toggleAppOpen] = useState(
    window.localStorage.getItem('mockAppOpen') === null
      ? true
      : window.localStorage.getItem('mockAppOpen') === 'true',
  );
  const [isModalOpened, toggleModalOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState(null);
  const [iframeKey, setIframeKey] = useState(
    `app.html?queryObj=${encodeURIComponent(
      JSON.stringify({ page: 'app', cache: 111 }),
    )}`,
  );

  const extensionAppRef = useRef();

  const handleAppWindowChange = (isApp, newValue) => {
    if (isApp && isAppOpen !== newValue) {
      window.localStorage.setItem('mockAppOpen', newValue);
      toggleAppOpen(newValue);
    } else if (!isApp && isRendererOpen !== newValue) {
      window.localStorage.setItem('mockRendererOpen', newValue);
      toggleRendererOpen(newValue);
    }
  };

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
      template = {
        template: `<messageML><i>Renderer error:</i> ${errorMessage}<br />Please reload the webpage, and try again.</messageML>`,
      };
      sentJson = {};
    }

    rendererRef.contentWindow.postMessage(
      {
        call: 'sendValue',
        value: {
          entityType,
          template,
          entityJson: sentJson,
        },
      },
      '*',
    );
  };

  useEffect(() => {
    if (isAppOpen) {
      internalPointer = setInterval(() => {
        if (extensionAppRef.current.contentWindow) {
          extensionAppRef.current.contentWindow.SYMPHONY = Object.assign(
            {},
            window.SYMPHONY,
          );
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
        toggleModalOpen(true);
      });

      window.addEventListener('keydown', ({ code }) => {
        if (code === 'Escape') {
          toggleDialogDrawer(false);
          toggleEntityDrawer(false);
        }
      });
    }
  }, [isAppOpen]);

  const changeTheme = () => {
    const isLight = localStorage.getItem('theme-name') === 'LIGHT';
    const themeColor = isLight ? 'DARK' : 'LIGHT';
    localStorage.setItem('theme-name', themeColor);
    setIframeKey(
      `app.html?queryObj=${encodeURIComponent(
        JSON.stringify({ page: 'app', cache: Math.random() * 100 }),
      )}`,
    );
    internalPointer = setInterval(() => {
      if (extensionAppRef.current.contentWindow) {
        extensionAppRef.current.contentWindow.SYMPHONY = Object.assign(
          {},
          window.SYMPHONY,
        );
        extensionAppRef.current.contentWindow.themeColor = themeColor;
      }
    }, 1);

    window.addEventListener('openDialog', ({ detail }) => {
      setModalOptions({
        url: detail.url,
        height: detail.height,
        width: detail.width,
      });
      toggleModalOpen(true);
    });
  };

  const changeSize = () => {
    const currSize = localStorage.getItem('theme-size');
    const nextSize = currSize
      ? THEME_SIZES[(THEME_SIZES.findIndex(l => l === currSize) + 1) % THEME_SIZES.length]
      : THEME_SIZES[3];
    localStorage.setItem('theme-size', nextSize);
    setIframeKey(
      `app.html?queryObj=${encodeURIComponent(
        JSON.stringify({ page: 'app', cache: Math.random() * 100 }),
      )}`,
    );
    internalPointer = setInterval(() => {
      if (extensionAppRef.current.contentWindow) {
        extensionAppRef.current.contentWindow.SYMPHONY = Object.assign(
          {},
          window.SYMPHONY,
        );
      }
    }, 1);
    window.addEventListener('openDialog', ({ detail }) => {
      setModalOptions({
        url: detail.url,
        height: detail.height,
        width: detail.width,
      });
      toggleModalOpen(true);
    });
  };

  const onExtensionAppLoaded = () => {
    clearInterval(internalPointer);
  };

  const appIcon = bundle.iconUrl ? bundle.iconUrl : 'assets/app-icon.png';
  const currSize = localStorage.getItem('theme-size');

  return (
    <Wrapper>
      {ReactDOM.createPortal(
        <EntityDrawer
          closeHandler={() => toggleEntityDrawer(false)}
          submitHandler={submitHandler}
          isOpen={isEntityDrawerOpened}
        />,
        document.body,
      )}
      {ReactDOM.createPortal(
        <DialogDrawer
          isOpen={isDialogDrawerOpened}
          closeHandler={() => toggleDialogDrawer(false)}
        />,
        document.body,
      )}
      <WrapperSidenav
        appIcon={appIcon}
        appName={bundle.name}
        appOpenHandler={() => handleAppWindowChange(true, true)}
        rendererOpenHandler={() => handleAppWindowChange(false, true)}
        toggleEntityDrawer={() => toggleEntityDrawer(true)}
        toggleDialogDrawer={() => toggleDialogDrawer(true)}
      />
      {isModalOpened && (
        <Modal
          modalOptions={modalOptions}
          closeHandler={() => toggleModalOpen(false)}
        />
      )}
      <CenterContainer>
        <WrapperTopbar />
        <CenterContainerBody>
          {isAppOpen && (
            <WrapperChatWindow
              icon={appIcon}
              title={bundle.name}
              onChatClosed={() => handleAppWindowChange(true, !isAppOpen)}
              onThemeChanged={changeTheme}
              onSizeChanged={changeSize}
              hasFooter={false}
              currSize={currSize || 'normal'}
            >
              {iframeKey && (
                <ExtensionAppIframe
                  ref={ref => (extensionAppRef.current = ref)}
                  onLoad={onExtensionAppLoaded}
                  src={iframeKey}
                />
              )}
            </WrapperChatWindow>
          )}
          {isRendererOpen && (
            <WrapperChatWindow
              icon="/assets/symphony-logo.png"
              hasButtons
              title="Message Renderer"
              hasFooter
              onChatClosed={() => handleAppWindowChange(false, !isRendererOpen)}
            >
              <ExtensionAppIframe
                src="renderer-app.html"
                ref={(ref) => {
                  rendererRef = ref;
                }}
              />
            </WrapperChatWindow>
          )}
        </CenterContainerBody>
      </CenterContainer>
    </Wrapper>
  );
};

export default SymphonyWrapper;
