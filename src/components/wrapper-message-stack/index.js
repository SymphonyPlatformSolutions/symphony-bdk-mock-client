import React from 'react';
import styled from 'styled-components';
import { EntityTitle } from './styles';
import './symphony.scss';
import './chat-module.css';
import ChatMessageHeader from '../chat-message-header';

/**
 * FILE TO BE IMPLEMENTED.
 */

const MessageWrapper = styled.div`
  transition: all 0.3s;
  :hover {
    background-color: rgba(23,25,28, 0.08) !important;
  }
  margin-bottom: 8px;
`;
const Line = styled.div`
  border-top: 1px solid #263d5d;
  opacity: 0.2;
  width: ${({ small }) => (small ? '16px' : '100%')};
`;

const SeparatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const EntitySeparator = props => (
  <SeparatorContainer>
    <Line small />
    <EntityTitle>
      {props.children}
    </EntityTitle>
    <Line />
  </SeparatorContainer>
);

const WrapperMessageStack = props => (
  <div>
    <EntitySeparator>
      {props.entityType}
    </EntitySeparator>
    <MessageWrapper>
      <ChatMessageHeader />
      <div id="rendered-content" className="rendered-content with-blue-border">
        <div className="rendered-content-container contrast theme-color-grey trader twentyfour-hour-with-sec-time light condensed">
          <div id="main-content-wrapper" className="contrast light condensed">
            <div className="message-group__content rendered-content-wrapper">
              <div
                className="message__body body message-content"
                dangerouslySetInnerHTML={{
                  __html: props.htmlContent,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </MessageWrapper>
  </div>
);

export default WrapperMessageStack;
