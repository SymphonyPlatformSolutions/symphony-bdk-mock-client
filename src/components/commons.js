import styled from 'styled-components';

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
