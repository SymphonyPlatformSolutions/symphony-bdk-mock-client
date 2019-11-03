import React from 'react';
import styled from 'styled-components';
import { Close } from 'styled-icons/material';

export const BlueButton = styled.button`
  width: ${props => props.width || '80%'};
  height: ${props => props.height || 'auto'};
  border-radius: 5px;
  padding: 0.6rem;
  cursor: pointer;
  background-color: #2c9eec;
  color: white;
  justify-content: center;
  border: none;
  margin: ${props => props.margin || 'none'};

  transition: all 0.3s;

  :disabled {
    background-color: #35383E;
    cursor: default;
    color: #5d5d5d;
  }

  :hover:not(:disabled) {
    background-color: #78c2f5;
  }
`;

const CloseButton = styled.button`
  width: 2.3rem;
  height: 2.3rem;
  padding: 0;
  border: none;
  font-size: 1rem;
  font-size: 1.3rem;
  color: #2c9eec;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 10px;
  background-color: inherit;

  transition: all 0.3s;

  :hover {
    color: #78c2f5;
  }
`;

const CloseWrapper = styled.div`
  padding: 5px 5px 10px 10px;
`;

export const DrawerClose = (props) => {
  const { onClick } = props;

  return (
    <CloseButton type="button" onClick={onClick}>
      <CloseWrapper>
        <Close />
      </CloseWrapper>
    </CloseButton>
  );
};
