/* global MODAL_IDS */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Editor from '../editor';
import {
  ButtonBox, StyledSelect, FloatingRightButton, Title, TopContainer,
  CloseButton, Container, DialogDrawer,
} from './styles';

const keyMapDialogs = Object.keys(MODAL_IDS).map(key => ({
  key,
  value: key,
}));

function ModalDrawer({ closeHandler, isOpen }) {
  const [dialog, setDialog] = useState(keyMapDialogs[0].value);
  const [jsonText, changeJsonText] = useState(
    JSON.stringify(MODAL_IDS[keyMapDialogs[0].value].entityData, 0, 2),
  );

  const handleOnClick = () => {
    const madeServices = window.SYMPHONY.mockHelper.getMadeServices();
    if (!madeServices || !madeServices.length) {
      console.log('No services were made, so nothing to render the entity!');
      return;
    }

    if (madeServices) {
      const enricherService = madeServices.find(el => el.name.includes('enricher'));
      enricherService.instance.action({
        ...MODAL_IDS[dialog],
        entityData: JSON.parse(jsonText),
      });
    }

    closeHandler();
  };

  return (
    <DialogDrawer className={isOpen ? 'open' : null}>
      <Container>
        <TopContainer>
          <Title>Open a custom dialog</Title>
          <span>
            <i>
              These dialogs need to be <b>defined</b> in the{' '}
              <b>app-constants.js</b> file in your extension-app folder
            </i>
          </span>
          <CloseButton type="button" onClick={closeHandler}>
            x
          </CloseButton>
        </TopContainer>
        <h4>Select Dialog to Open</h4>
        <StyledSelect
          onChange={({ target }) => {
            setDialog(target.value);
            changeJsonText(
              JSON.stringify(MODAL_IDS[target.value].entityData, 0, 2),
            );
          }}
        >
          {keyMapDialogs.map(entry => (
            <option key={entry.key} value={entry.value}>
              {entry.key}
            </option>
          ))}
        </StyledSelect>
        <hr />
        <h4>Entity JSON</h4>
        <Editor name="modal" value={jsonText} onChange={changeJsonText} />
        <ButtonBox>
          <FloatingRightButton type="button" onClick={handleOnClick}>
            Open Dialog
          </FloatingRightButton>
        </ButtonBox>
      </Container>
    </DialogDrawer>
  );
}

ModalDrawer.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
ModalDrawer.defaultProps = {
  isOpen: false,
};

export default ModalDrawer;
