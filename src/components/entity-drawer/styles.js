import styled from 'styled-components';
import { Warning } from 'styled-icons/material';
import { BlueButton } from '../commons';

export const DrawerModal = styled.div`
position: fixed;
border-radius: 2px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
padding: 2rem;
left: -100%;
opacity: 0;
transition: left 0.3s ease-in-out, opacity 0.3s ease-in-out;
background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
height: calc(100vh - 82px);
&.open {
  left: 6px;
  opacity: 1;
}
`;

export const Container = styled.div`
  width: 45rem;
`;

export const CloseButton = styled.button`
  border: none;
  border-radius: 50%;
  height: 1.8rem;
  width: 1.8rem;
  font-size: 1.3rem;
  color: #919191;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: none;
`;

export const Title = styled.span`
  font-size: 2rem;
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledSelect = styled.select`
  background: white;
  border: 2px solid #807c7c;
  padding: 5px;
`;

export const FloatingRightButton = styled(BlueButton)`
  margin: 10px 0 0 0;
  position: absolute;
  right: 15px;
  width: 10rem;
`;

export const WarningIcon = styled(Warning)`
  color: #ffff00;
  margin-right: 10px;
`;
