import React from 'react';
import PropTypes from 'prop-types';
import {
  IconClose,
  ChatInput,
  ChatToolbar,
  ChatWindow,
  ChatWindowBody,
  ChatWindowFooter,
  ChatWindowHeader,
  ChatWindowHeaderTitle,
  ChatWindowHeaderToolbar,
  ChatWindownHeaderIconContainer,
  IconAttachment,
  IconBlock,
  IconChevronUp,
  IconColorLens,
  IconExternalLink,
  IconMusicNote,
  IconPin,
  IconSmiley,
  MessageBoxWrapper,
  Separator,
  Title,
} from './styles';
import UiButtonSelector from '../ui-button-selector';

function MessageBox() {
  return (
    <MessageBoxWrapper>
      <IconChevronUp size={20} />
      <ChatInput placeholder="Type your message here..." />
      <ChatToolbar>
        <IconAttachment size={20} />
        <IconSmiley size={18} />
        <IconBlock size={20} />
        <Separator>|</Separator>
        <IconMusicNote size={20} />
      </ChatToolbar>
    </MessageBoxWrapper>
  );
}

const WrapperChatWindow = ({
  children,
  title,
  hasFooter,
  hasButtons,
  icon,
  onThemeChanged,
  onChatClosed,
}) => (
  <ChatWindow>
    <ChatWindowHeader>
      <ChatWindowHeaderToolbar>
        {onThemeChanged && <IconColorLens size={20} onClick={onThemeChanged} />}
        <IconPin size={20} />
        <IconExternalLink size={20} />
        <IconClose size={20} onClick={onChatClosed} />
      </ChatWindowHeaderToolbar>
      <ChatWindownHeaderIconContainer>
        <Title>
          {icon && <img width={16} height={16} src={icon} />}
          <ChatWindowHeaderTitle>{title}</ChatWindowHeaderTitle>
        </Title>
        <div>
          {hasButtons && (
            <UiButtonSelector
              buttons={SYMPHONY.mockHelper.getUiButtons()}
              implementation={SYMPHONY.mockHelper.getImplementation()}
            />
          )}
        </div>
      </ChatWindownHeaderIconContainer>
    </ChatWindowHeader>
    <ChatWindowBody>{children}</ChatWindowBody>
    {hasFooter && (
      <ChatWindowFooter>
        <MessageBox />
      </ChatWindowFooter>
    )}
  </ChatWindow>
);

WrapperChatWindow.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  hasFooter: PropTypes.bool,
  icon: PropTypes.string,
  onThemeChanged: PropTypes.func.isRequired,
  onChatClosed: PropTypes.func.isRequired,
};

WrapperChatWindow.defaultProps = {
  children: null,
  title: 'My chat',
  hasFooter: true,
  icon: null,
};

export default WrapperChatWindow;
