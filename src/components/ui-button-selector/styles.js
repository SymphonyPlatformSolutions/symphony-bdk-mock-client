import styled from 'styled-components';

export const SelectorButton = styled.button`
  border: 0;
  background-color: rgb(0,0,0,0);
  font-size: 12px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'default')};
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  cursor: pointer;
  color: ${({ selected }) => (selected ? '#273d5d' : '#808289')};
`;

export const SelectorContainer = styled.div`
  display: flex;
  position: absolute;
  top: -19px;
  margin-left: 16px;
`;

export const StyledUiButton = styled.button`
  border-radius: 30px;
  padding: 5px 11px 5px ${({ hasIcon }) => (hasIcon ? '27px' : '11px')};
  cursor: pointer;
  color: #3da2fd;
  background-color: transparent;
  border: 1px solid #3da2fd;
  transition: all 0.2s;
  :hover {
    background-color: #006caf;
    border: 1px solid #006caf;
    color: white;
  }
`;

export const ButtonContainer = styled.div`
  position: relative;
  margin-right: 10px;
`;

export const ButtonIcon = styled.img`
  position: absolute;
  top: 5px;
  left: 9px;
`;

export const ButtonArea = styled.div`
  display: flex;
  margin-top: 3px;
  margin-left: 14px;
`;
