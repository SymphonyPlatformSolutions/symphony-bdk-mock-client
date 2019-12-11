import React from 'react';
import styled from 'styled-components';
import {
  ChevronUp, Block, UpArrowAlt, DownArrowAlt,
  Font,
} from 'styled-icons/boxicons-regular';
import { Attachment, MusicNote, ColorLens } from 'styled-icons/material';
import { Smiley } from 'styled-icons/octicons';
import { Pin } from 'styled-icons/boxicons-solid';
import { ExternalLink, Close } from 'styled-icons/evil';

export const ChatWindow = styled.div`
  display: grid;
  grid-auto-rows: 71px auto 40px;
  border-color: transparent !important;
  border-width: 0 !important;
  border-radius: 3px !important;
  box-shadow: 0 0 0 0 transparent;
  margin: 10px 5px 9px 6px;
  background-color: #ffffff;
`;

export const ChatWindowHeader = styled.div`
  display: inline-flex;
  flex-direction: column;
  border-bottom: 1px solid #e0e4eb;
  height: 70px;
`;

export const ChatWindownHeaderIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  transform: translateY(-5px);
`;

export const ChatWindowHeaderTitle = styled.h3`
  margin: 0 0 0 10px;
`;

export const ChatWindowBody = styled.div`
  overflow: auto;
  flex-grow: 1;
`;
export const ChatWindowFooter = styled.div`
  overflow: auto;
  height: 40px;
`;

export const MessageBoxWrapper = styled.div`
  display: flex;
  height: 34px;
  flex-direction: row;
  border-radius: 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border: 1px solid #c9cbd1;
  margin: 0 24px 0 24px;
  color: #c9cbd1;
  :hover {
    border: 2px solid #6a707c;
    color: #6a707c;
  }
  ::placeholder {
    color: #6a707c;
  }
`;

export const IconChevronUp = styled(ChevronUp)`
  margin-top: 9px;
  margin-left: 9px;
`;

export const ChatToolbar = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
`;
export const IconBlock = styled(Block)`
  margin-left: 8px;
`;
export const IconAttachment = styled(Attachment)`
  margin-left: 8px;
`;
export const IconMusicNote = styled(MusicNote)`
  margin-left: 8px;
`;
export const IconSmiley = styled(Smiley)`
  margin-left: 8px;
`;

export const ChatInput = styled.input`
  border: none;
  flex-grow: 1;
`;

export const Separator = styled.span`
  margin-left: 8px;
`;

export const IconPin = styled(Pin)`
  margin-left: 8px;
`;
export const IconExternalLink = styled(ExternalLink)`
  margin-left: 8px;
`;
export const IconClose = styled(Close)`
  margin-left: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: black;
    transform: scale(1.1);
  }
`;

export const IconColorLens = styled(ColorLens)`
  margin-left: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #29b6f6;
  }
`;

export const ChatWindowHeaderToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 15px 0 0;
  color: #808289;
  font-weight: 200;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
`;

export const SizeButton = styled.p`
  margin: 0;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #29b6f6;
  }
`;
const FontButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  transition: all 0.3s;
  &:hover {
    color: #29b6f6;
  }
  cursor: pointer;
`;
const ArrowWrapper = styled.div`
  margin-left: -7px;
`;
export const FontSizePanelWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const FontSizeButton = ({ isUp, onClick }) => (
  <FontButtonWrapper onClick={onClick}>
    <Font size={20} />
    <ArrowWrapper>
      {isUp ? <UpArrowAlt size={18} /> : <DownArrowAlt size={18} />}
    </ArrowWrapper>
  </FontButtonWrapper>
);

const Rotator = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease-in-out;
  transform: translateY(${({ currSizeIndex }) => currSizeIndex * (-19)}px);
`;
const RotatorWindow = styled.div`
  font-weight: 300;
  height: 18px;
  overflow: hidden;
`;
export const SizeRotator = (props) => {
  const { sizes, currSizeIndex } = props;
  return (
    <RotatorWindow>
      <Rotator currSizeIndex={currSizeIndex}>
        {sizes.map(l => (<div key={l}>{l}</div>))}
      </Rotator>
    </RotatorWindow>
  );
};
