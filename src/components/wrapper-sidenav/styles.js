import styled from 'styled-components';
import { Filter } from 'styled-icons/boxicons-regular';

export const IconFilter = styled(Filter)`
  position: absolute;
  margin: 22px 0 0 19px;
  color: #e0e4eb;
  font-weight: bold;
`;

export const AddButton = styled.div`
  line-height: 1;
  background-color: #007ecc;
  border-radius: 24px;
  height: 40px;
  width: 40px;
  position: absolute;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.24), 0 0 6px 0 rgba(0, 0, 0, 0.12);
  left: 228px;
  ::before {
    content: "+";
    position: absolute;
    font-size: 31px;
    -webkit-font-smoothing: antialiased;
    color: white;
    padding-left: 12px;
    margin-top: 6px;
  }
`;

export const SideNav = styled.div`
  width: 250px;
  min-width: 250px;
  height: 100%;
  background: #273d5d;
  overflow: hidden;
`;

export const AvatarWrap = styled.div`
  display: flex;
  margin: 14px 14px 0 14px;
`;

export const AvatarImg = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;

export const AwayStatus = styled.div`
 width: 12px;
 height:12px;
 background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PHBhdGggZD0iTTYgMkMzLjggMiAyIDMuOCAyIDZzMS44IDQgNCA0IDQtMS44IDQtNC0xLjgtNC00LTR6bTIgNUg1VjRoMXYyaDJ2MXoiIGZpbGw9IiNmN2JiMDAiLz48L3N2Zz4=) center/12px no-repeat;
`;

export const AvailableStatus = styled.div`
 width: 12px;
 height:12px;
 background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PHBhdGggZD0iTTYgMTBjLTIuMiAwLTQtMS44LTQtNHMxLjgtNCA0LTQgNCAxLjggNCA0LTEuOCA0LTQgNHoiIGZpbGw9IiM2YjYiLz48L3N2Zz4=) center/12px no-repeat;
`;

export const AvatarStatus = styled(AvailableStatus)`
 position: absolute;
 left: 36px;
 top: 36px;
`;

export const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const UserNameText = styled.span`
 color: #2f9bf4;
 font-weight: 600;
 font-size: 0.9rem;
 line-height: 1;
 :hover {
   text-decoration: underline;
 }
`;

export const UserNamePresence = styled.span`
  font-weight: 500;
  font-size: .7rem;
  margin-top: 6px;
  -webkit-font-smoothing: antialiased;
  color: #9fa4ad;
`;

export const FilterList = styled.input`
  color: #e0e4eb;
  background: #374c68;
  border: none;
  font-weight: 600;
  font-size: .8rem;
  padding-left: 40px;
  height: 27px;
  font-variant-ligatures: none!important;
  margin: 20px 0 0 14px;
  
  :hover {
    background: #425876;
  }
  ::placeholder {
    color: #e0e4eb;
  }
`;

export const SideNavPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #99a4b3;
  font-size: 0.7rem;
  font-weight: 700;
`;

export const SideNavPanelContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

export const SideNavPanelInnerContainer = styled.div`
  background: #1e3049;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

export const SideNavPresenceContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: ${({ isFunctional }) => (isFunctional ? 'pointer' : 'default')};
  :hover {
    ${({ isFunctional }) => (isFunctional ? 'background-color: rgba(255,255,255, 0.15);' : null)}
  }
`;
export const SideNavPresenceText = styled.span`
  white-space: nowrap; 
  overflow: hidden;
  width: 195px;
  text-overflow: ellipsis;
  font-size: .8rem;
  font-weight: 500;
  margin: 10px 0 10px 10px;
`;

export const SideNavPresenceIcon = styled.span`
  width: 16px;
  height: 16px;
  background: ${props => props.url};
`;

export const DrawerButtonContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  justify-content: center;
  display: flex;
`;
