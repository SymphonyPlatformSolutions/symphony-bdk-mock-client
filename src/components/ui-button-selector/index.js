import React, { useState } from 'react';
import {
  SelectorButton,
  SelectorContainer,
  StyledUiButton,
  ButtonContainer,
  ButtonIcon,
  ButtonArea,
} from './styles';

const MODIFIERS = {
  IM: 'IM',
  MIM: 'MIM',
  ROOM: 'ROOM',
};

const modifierKeys = Object.keys(MODIFIERS);

const Selector = (props) => {
  const { selected, clickHandler, children } = props;
  return (
    <div>
      <SelectorButton selected={selected} type="button" onClick={clickHandler}>
        {children}
      </SelectorButton>
    </div>
  );
};

const UiButton = (props) => {
  const { children, clickHandler, icon } = props;
  return (
    <ButtonContainer>
      {icon && <ButtonIcon height={16} width={16} src={icon} />}
      <StyledUiButton onClick={clickHandler} hasIcon={!!icon}>{children}</StyledUiButton>
    </ButtonContainer>
  );
};

const UiButtonSelector = (props) => {
  const { buttons, implementation } = props;
  const [currentModifier, changeModifier] = useState(MODIFIERS.IM);

  return (
    <div>
      <SelectorContainer>
        {modifierKeys.map(el => (
          <Selector
            selected={el === currentModifier}
            clickHandler={() => changeModifier(el)}
          >
            {el}
          </Selector>
        ))}
      </SelectorContainer>
      <ButtonArea>
        {buttons[currentModifier].map(el => (
          <UiButton icon={el.icon} clickHandler={() => SYMPHONY.mockHelper.getImplementation().trigger('', el.id, '', el.data)}>{el.label}</UiButton>
        ))}
      </ButtonArea>
    </div>
  );
};

export default UiButtonSelector;
