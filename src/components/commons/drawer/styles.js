import styled from 'styled-components';
import { BlueButton } from '../../commons';

export const DrawerModal = styled.div`
  font-family: 'SymphonyLato';
  position: fixed;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 0;
  left: -100%;
  opacity: 0;
  transition: left 0.2s ease-in-out, opacity 0.3s ease-in-out;
  background-color: #18191d;
  height: calc(100vh - 82px);
  color: white;
  &.open {
    left: -1px;
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 45rem;
`;

export const Title = styled.span`
  font-size: 1.5rem;
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FloatingRightButton = styled(BlueButton)`
  width: 10rem;
`;

export const ControlPanel = styled.div`
  color: white;
  padding: 2rem;
  background-color: #17181d;
`;

export const BottomPanel = styled.div`
  margin: 1rem 2rem;
`;

export const DropdownContainer = styled.div`
  z-index: 100;
`;

export const SubTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.6rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: flex-end;
`;
