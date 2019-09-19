/* global ENRICHER_EVENTS */

import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../editor';
import {
  CloseButton, Container, TopContainer,
  Title, DrawerModal, FloatingRightButton, StyledSelect, WarningIcon,
} from './styles';

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
    jsonText: JSON.stringify(keyMapEntities[0].json, 0, 2),
  };

  handleSelectChange = ({ target }) => {
    const { selectedIndex } = target;
    this.setState({
      jsonText: JSON.stringify(keyMapEntities[selectedIndex].json, 0, 2),
    });
  };

  handleJsonChange = (data) => {
    this.setState({
      jsonText: data,
    });
  };

  handleOnClick = () => {
    const { submitHandler } = this.props;
    const { jsonText } = this.state;

    if (this.selectRef.value === RENDER_ALL) {
      Object.keys(ENRICHER_EVENTS).forEach(el => submitHandler(ENRICHER_EVENTS[el].type, {
        id: JSON.stringify(ENRICHER_EVENTS[el].json),
      }));
      return;
    }

    submitHandler(this.selectRef.value || this.textFieldRef.value, {
      id: jsonText || '{}',
    });
  };

  render() {
    const { closeHandler, isOpen } = this.props;

    const { jsonText } = this.state;

    return (
      <DrawerModal className={isOpen ? 'open' : null}>
        <Container>
          <TopContainer>
            <Title>Select Entities for enrichment</Title>
            <span>
              <WarningIcon size={35} />
              <i>
                These entities need to be <b>defined</b> in your
                GeneralEnricher.js <b>and</b> in its entities.js dependency
              </i>
            </span>
            <CloseButton type="button" onClick={closeHandler}>
              x
            </CloseButton>
          </TopContainer>
          <h4>Select Entity</h4>
          <StyledSelect
            onChange={this.handleSelectChange}
            ref={(ref) => {
              this.selectRef = ref;
            }}
          >
            {keyMapEntities.map(entry => (
              <option key={entry.key} value={entry.type}>
                {entry.key}
              </option>
            ))}
          </StyledSelect>
          <hr />
          <h4>Entity JSON</h4>
          <Editor name="enricher" value={jsonText} onChange={this.handleJsonChange} />
          <FloatingRightButton type="button" onClick={this.handleOnClick}>
            Render Entity
          </FloatingRightButton>
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
