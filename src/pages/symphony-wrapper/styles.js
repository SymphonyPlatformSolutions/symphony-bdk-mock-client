import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  display: flex;
  font-family: SymphonyLato, "Hiragino Kaku Gothic Pro", Meiryo,
    "Yu Gothic Medium", sans-serif;
  font-weight: 400;
  font-style: normal;
`;

export const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  border-left: 2px solid #e0e4eb;
  border-right: 2px solid #e0e4eb;
  flex-direction: column;
`;

export const CenterContainerBody = styled.div`
  display: grid;
  grid-auto-rows: auto auto;
  height: 100%;
  background: #e3e5e8;

  @media (min-width: 1300px) {
    grid-auto-flow: column;
  }
`;

export const ExtensionAppIframe = styled.iframe`
  width: 100%;
  height: calc(100% - 5px);
  border: none;
`;
