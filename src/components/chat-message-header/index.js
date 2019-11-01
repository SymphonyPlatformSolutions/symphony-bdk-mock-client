import React from 'react';
import styled from 'styled-components';

const TimeWrapper = styled.span`
  margin-left: 12px;
  font-size: 12px;
  color: #6a707c;
`;
const UserWrapper = styled.span`
  color: black;
  font-weight: bold;
`;
const Container = styled.div`
  font-family: 'SymphonyLato';
  display: flex;
  align-items: center;
  padding: 6px 0;
`;
const ChatMessageHeader = props => (
  <Container>
    <UserWrapper>Renderer Client</UserWrapper>
    <TimeWrapper>09:25</TimeWrapper>
  </Container>
);

export default ChatMessageHeader;
