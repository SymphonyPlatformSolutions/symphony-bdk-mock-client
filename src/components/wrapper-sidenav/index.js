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

function SideNavChatPresence({
  status, text, icon, handler,
}) {
  const statusIcon = status === null ? null : status ? <AvailableStatus /> : <AwayStatus />;
  const hasIcon = icon !== null ? `url("${icon}")` : null;
  return (
    <SideNavPresenceContainer isFunctional={!!handler} onClick={handler}>
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
  handler: PropTypes.func,
};

SideNavChatPresence.defaultProps = {
  status: false,
  text: '',
  icon: '',
  handler: null,
};

const STATIC_SIDE_NAV = {
  signals: {
    id: 1,
    label: 'SIGNALS',
    hasAdd: true,
    list: [
      {
        id: 0,
        status: null,
        text: 'Keywords',
        icon: null,
      },
      {
        id: 1,
        status: null,
        text: 'All Following',
        icon: null,
      },
    ],
  },
  invites: {
    id: 3,
    label: 'INVITES',
    hasAdd: true,
    list: [
      {
        id: 0,
        status: null,
        text: 'Create Team',
        icon: null,
      },
      {
        id: 1,
        status: null,
        text: 'Invite Contacts',
        icon: null,
      },
    ],
  },
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
  const {
    toggleEntityDrawer,
    toggleDialogDrawer,
    appOpenHandler,
    rendererOpenHandler,
    appIcon,
    appName,
  } = props;

  const APPS = {
    id: 2,
    label: 'APPLICATIONS (click here!)',
    hasAdd: true,
    list: [
      {
        id: 0,
        status: null,
        text: appName,
        icon: appIcon,
        handler: appOpenHandler,
      },
      {
        id: 1,
        status: null,
        text: 'Renderer',
        icon: null,
        handler: rendererOpenHandler,
      },
    ],
  };

  return (
    <SideNav>
      <AvatarWrap>
        <div>
          <AvatarImg src="assets/picard-avatar.png" />
          <AvatarStatus />
        </div>
        <UserNameWrapper>
          <UserNameText>Cpt. Picard</UserNameText>
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
      <SideNavPanels key="signals" {...STATIC_SIDE_NAV.signals} />
      <SideNavPanels key="applications" {...APPS} />
      <SideNavPanels key="invites" {...STATIC_SIDE_NAV.invites} />
      <DrawerButtonContainer>
        <BlueButton type="button" onClick={toggleEntityDrawer}>
          Open Message Editor
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
  appOpenHandler: PropTypes.func.isRequired,
  rendererOpenHandler: PropTypes.func.isRequired,
  appIcon: PropTypes.string,
  appName: PropTypes.string,
};
WrapperSidenav.defaultProps = {
  appIcon: null,
  appName: 'My App',
};

export default WrapperSidenav;
