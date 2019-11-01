import React from 'react';
import styled from 'styled-components';
import { Close } from 'styled-icons/material';

export const BlueButton = styled.button`
  width: ${props => props.width || '80%'};
  height: ${props => props.height || 'auto'};
  border-radius: 30px;
  padding: 0.6rem;
  cursor: pointer;
  background-color: rgba(0,0,0,0);
  background-color: #007ecc;
  color: white;
  justify-content: center;
  border: none;
  margin: ${props => props.margin || 'none'};

  :hover {
    background-color: #138bd6;
  }
`;

const CloseButton = styled.button`
  padding: 0;
  border: none;
  border-radius: 0 0 0 70%;
  height: 2.3rem;
  width: 2.3rem;
  font-size: 1rem;
  font-size: 1.3rem;
  color: #F49EA0;
  background-color: #FF4840;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background-color: none;

  transition: all 0.3s;

  :hover {
    background-color: #DD3638;
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
