import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
  IconCommunity,
  IconCog,
  IconContainer,
  IconHelp,
  IconInbox,
  IconMarket,
  IconMention,
  IconSearch,
  IconShield,
  IconText,
  IconWrapper,
  Searchbar,
  Topbar,
} from './styles';

function TopbarIcon({ children, label }) {
  return (
    <IconWrapper>
      <IconShield>{children}</IconShield>
      <IconText>{label}</IconText>
    </IconWrapper>
  );
}

const WrapperTopbar = () => (
  <Topbar>
    <Grid fluid>
      <Row>
        <Col xs={2} sm={3} md={5} lg={7} xl={9}>
          <IconSearch size="20px" />
          <Searchbar placeholder="Search" />
        </Col>
        <Col xs={9} sm={9} md={7} lg={5} xl={3}>
          <IconContainer>
            <TopbarIcon label="MENTIONS">
              <IconMention size="20px" />
            </TopbarIcon>
            <TopbarIcon label="COMMUNITY">
              <IconCommunity size="20px" />
            </TopbarIcon>
            <TopbarIcon label="INBOX">
              <IconInbox size="20px" />
            </TopbarIcon>
            <TopbarIcon label="MARKET">
              <IconMarket size="20px" />
            </TopbarIcon>
            <TopbarIcon label="HELP">
              <IconHelp size="20px" />
            </TopbarIcon>
            <TopbarIcon label="SETTINGS">
              <IconCog size="20px" />
            </TopbarIcon>
          </IconContainer>
        </Col>
      </Row>
    </Grid>
  </Topbar>
);

export default WrapperTopbar;
