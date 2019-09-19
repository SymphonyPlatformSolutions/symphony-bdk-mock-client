import styled from 'styled-components';
import { Search, QuestionMark } from 'styled-icons/boxicons-regular';
import { Mention, Inbox } from 'styled-icons/octicons';
import { UserFriends } from 'styled-icons/fa-solid';
import { Share2 } from 'styled-icons/feather';
import { Cog } from 'styled-icons/boxicons-solid';

export const Topbar = styled.div`
  width: 100%;
  height: 60px;
  background: #f9f8f8;
`;

export const IconSearch = styled(Search)`
  color: #6a6b74;
  font-weight: 600;
  position: absolute;
  margin: 19px 0 0 33px;
`;

export const IconMention = styled(Mention)`
  margin: 8px 0 0 7px;
`;

export const IconCommunity = styled(UserFriends)`
  margin: 8px 0 0 7px;
`;

export const IconInbox = styled(Inbox)`
  margin: 8px 0 0 7px;
`;

export const IconMarket = styled(Share2)`
  margin: 8px 0 0 7px;
`;

export const IconHelp = styled(QuestionMark)`
  margin: 8px 0 0 7px;
`;

export const IconCog = styled(Cog)`
  margin: 8px 0 0 7px;
`;

export const IconText = styled.p`
  font-size: 9px;
`;

export const Searchbar = styled.input`
  color: #6a6b74;
  background: #e3e5e8;
  width: 90%;
  height: 34px;
  border: none;
  font-size: 1rem;
  padding-left: 40px;
  -webkit-font-smoothing: antialiased;
  font-variant-ligatures: none !important;
  margin: 12px 20px 10px 25px;
  border-radius: 2px;

  :hover {
    background: #cdcfd2;
    color: #00061b;
  }
  ::placeholder {
    color: #6a6b74;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  margin-top: 2px;
`;

export const IconShield = styled.div`
  border-radius: 50%;
  background: #e3e5e8;
  color: #72727e;
  width: 34px;
  height: 34px;
  &:hover {
    font-weight: bold;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #72727e;
`;
