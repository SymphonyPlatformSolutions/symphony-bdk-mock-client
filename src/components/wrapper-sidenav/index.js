import React from 'react';
import PropTypes from 'prop-types';
import { AddCircleOutline } from 'styled-icons/material';
import { BlueButton } from '../commons';
import {
  AddButton,
  AvailableStatus,
  AvatarImg,
  AvatarStatus,
  AvatarWrap,
  AwayStatus,
  DrawerButtonContainer,
  FilterList,
  IconFilter,
  SideNav,
  SideNavPanelContainer,
  SideNavPanelContainerHeader,
  SideNavPanelInnerContainer,
  SideNavPresenceContainer,
  SideNavPresenceIcon,
  SideNavPresenceText,
  UserNamePresence,
  UserNameText,
  UserNameWrapper,
} from './styles';

function SideNavChatPresence({ status, text, icon }) {
  const statusIcon = status === null ? null : status ? <AvailableStatus /> : <AwayStatus />;
  const hasIcon = icon !== null ? `url("${icon}")` : null;
  return (
    <SideNavPresenceContainer>
      {hasIcon && <SideNavPresenceIcon url={hasIcon} />}
      {statusIcon}
      <SideNavPresenceText>{text}</SideNavPresenceText>
    </SideNavPresenceContainer>
  );
}

SideNavChatPresence.propTypes = {
  status: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.string,
};

SideNavChatPresence.defaultProps = {
  status: false,
  text: '',
  icon: '',
};

function SideNavPanels({ label, hasAdd, list }) {
  return (
    <SideNavPanelContainer>
      <SideNavPanelContainerHeader>
        <p style={{ margin: 0 }}>{label}</p>
        {hasAdd && <AddCircleOutline size={20} />}
      </SideNavPanelContainerHeader>
      {list.length && (
        <SideNavPanelInnerContainer>
          {list.map(entry => (
            <SideNavChatPresence key={entry.id} {...entry} />
          ))}
        </SideNavPanelInnerContainer>
      )}
    </SideNavPanelContainer>
  );
}

SideNavPanels.propTypes = {
  label: PropTypes.string,
  hasAdd: PropTypes.bool,
  list: PropTypes.array,
};

SideNavPanels.defaultProps = {
  label: '',
  hasAdd: false,
  list: [],
};

const WrapperSidenav = (props) => {
  const { toggleEntityDrawer, toggleDialogDrawer } = props;
  return (
    <SideNav>
      <AvatarWrap>
        <div>
          <AvatarImg src="assets/picard-avatar.png" />
          <AvatarStatus />
        </div>
        <UserNameWrapper>
          <UserNameText>Picard</UserNameText>
          <UserNamePresence>Available</UserNamePresence>
        </UserNameWrapper>
        <AddButton />
      </AvatarWrap>
      <div>
        <IconFilter size="28" />
        <FilterList placeholder="Filter List" />
      </div>
      {window.SYMPHONY.chats.map(entry => (
        <SideNavPanels key={entry.id} {...entry} />
      ))}
      <DrawerButtonContainer>
        <BlueButton type="button" onClick={toggleEntityDrawer}>
          Open Entity Drawer
        </BlueButton>
      </DrawerButtonContainer>
      <DrawerButtonContainer>
        <BlueButton type="button" onClick={toggleDialogDrawer}>
          Open Dialog
        </BlueButton>
      </DrawerButtonContainer>
    </SideNav>
  );
};

WrapperSidenav.propTypes = {
  toggleEntityDrawer: PropTypes.func.isRequired,
  toggleDialogDrawer: PropTypes.func.isRequired,
};

export default WrapperSidenav;
