/* global MODAL_IDS */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Editor from '../editor';
// import {
//   ButtonBox, StyledSelect, FloatingRightButton, Title, TopContainer,
//   CloseButton, Container, DialogDrawer,
// } from './styles';
import {
  Container,
  TopContainer,
  Title,
  DrawerModal,
  FloatingRightButton,
  ControlPanel,
  BottomPanel,
  SubTitle,
  DropdownContainer,
  ButtonContainer,
} from '../commons/drawer/styles';
import { DrawerClose } from '../commons';
import { WarningBox } from '../commons/warning-box';
import Dropdown from '../commons/dropdown';

const keyMapDialogs = Object.keys(MODAL_IDS).map(key => ({
  value: key,
  label: key,
}));

function ModalDrawer({ closeHandler, isOpen }) {
  const [dialog, setDialog] = useState(null);
  const [jsonText, changeJsonText] = useState('');

  const handleOnClick = () => {
    const madeServices = window.SYMPHONY.mockHelper.getMadeServices();
    if (!madeServices || !madeServices.length) {
      return;
    }

    if (madeServices) {
      const enricherService = madeServices.find(el => el.name.includes('enricher'));
      enricherService.instance.action({
        ...MODAL_IDS[dialog.label],
        entityData: JSON.parse(jsonText),
      });
    }

    closeHandler();
  };

  return (
    <DrawerModal className={isOpen ? 'open' : null}>
      <Container>
        <ControlPanel>
          <TopContainer>
            <Title>Open a custom dialog</Title>
            <WarningBox>
              <i>
                These dialogs need to be <b>defined</b> in the{' '}
                <b>app-constants.js</b> file in your extension-app folder
              </i>
            </WarningBox>
            <DrawerClose onClick={closeHandler} />
          </TopContainer>
          <DropdownContainer>
            <Dropdown
              onChange={(chosen) => {
                setDialog(chosen);
                changeJsonText(
                  JSON.stringify(MODAL_IDS[chosen.value].entityData, 0, 2),
                );
              }}
              options={keyMapDialogs}
              value={dialog}
              label="Select Dialog to Open"
            />
          </DropdownContainer>
        </ControlPanel>
        <BottomPanel>
          <SubTitle>Modal Data</SubTitle>
          <Editor name="modal" value={jsonText} onChange={changeJsonText} />
          <ButtonContainer>
            <FloatingRightButton type="button" onClick={handleOnClick} disabled={!dialog}>
              Open Dialog
            </FloatingRightButton>
          </ButtonContainer>
        </BottomPanel>
      </Container>
    </DrawerModal>
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
