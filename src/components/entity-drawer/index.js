/* global ENRICHER_EVENTS */

import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../editor';
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
import Dropdown from '../commons/dropdown';
import { WarningBox } from '../commons/warning-box';

const RENDER_ALL = 'Render all notifications';
const keyMapEntities = Object.keys(ENRICHER_EVENTS).map(key => ({
  key,
  type: ENRICHER_EVENTS[key].type,
  json: ENRICHER_EVENTS[key].json,
}));
keyMapEntities.push({
  key: RENDER_ALL,
  type: RENDER_ALL,
  json: { warning: 'This will render all entities with their respective JSON' },
});

class EntityDrawer extends React.Component {
  jsonFieldRef;

  selectRef;

  state = {
    selected: null,
    jsonText: '',
  };

  handleSelectChange = (option) => {
    if (option.value === RENDER_ALL) {
      this.setState({
        selected: option,
        jsonText: JSON.stringify(keyMapEntities[keyMapEntities.length - 1].json),
      });
    } else {
      this.setState({
        selected: option,
        jsonText: JSON.stringify(ENRICHER_EVENTS[option.label].json, 0, 2),
      });
    }
  };

  handleJsonChange = (data) => {
    this.setState({
      jsonText: data,
    });
  };

  handleOnClick = () => {
    const { submitHandler } = this.props;
    const { jsonText, selected } = this.state;

    console.log(selected, jsonText);

    if (selected.label === RENDER_ALL) {
      Object.keys(ENRICHER_EVENTS).forEach(el => submitHandler(ENRICHER_EVENTS[el].type, {
        id: JSON.stringify(ENRICHER_EVENTS[el].json),
      }));
      return;
    }

    submitHandler(selected.value || this.textFieldRef.value, {
      id: jsonText || '{}',
    });
  };

  render() {
    const { closeHandler, isOpen } = this.props;
    const { jsonText, option, selected } = this.state;

    return (
      <DrawerModal className={isOpen ? 'open' : null}>
        <Container>
          <ControlPanel>
            <TopContainer>
              <Title>Select Message Template</Title>
              <WarningBox hasWarning>
                <i>
                  These templates need to be <b>defined</b> in your
                  GeneralEnricher.js <b>and</b> in its entities.js dependency
                </i>
              </WarningBox>
              <DrawerClose onClick={closeHandler} />
            </TopContainer>
            <DropdownContainer>
              <Dropdown
                onChange={this.handleSelectChange}
                options={keyMapEntities.map(entry => ({
                  value: entry.type,
                  label: entry.key,
                }))}
                value={option}
                label="Select Message Template"
              />
            </DropdownContainer>
          </ControlPanel>
          <BottomPanel>
            <SubTitle>Message Data</SubTitle>
            <div style={{ height: '80%' }}>
              <Editor
                name="enricher"
                value={jsonText}
                onChange={this.handleJsonChange}
              />
            </div>
            <ButtonContainer>
              <FloatingRightButton type="button" onClick={this.handleOnClick} disabled={!selected}>
                Render Message
              </FloatingRightButton>
            </ButtonContainer>
          </BottomPanel>
        </Container>
      </DrawerModal>
    );
  }
}

EntityDrawer.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

EntityDrawer.defaultProps = {
  isOpen: false,
};

export default EntityDrawer;
