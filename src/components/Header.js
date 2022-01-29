import React from 'react';

// Styles & Icons
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Components
import BadgeAvatars from './Avatar';

// Component
const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Tooltip title="History" arrow>
          <AccessTimeIcon />
        </Tooltip>
      </HeaderLeft>

      <HeaderSearch>
        <Tooltip title="Search" arrow>
          <SearchIcon />
        </Tooltip>
        <input placeholder="Search" />
      </HeaderSearch>

      <HeaderRight>
        <Tooltip title="Help" arrow>
          <HelpOutlineIcon />
        </Tooltip>

        <BadgeAvatars />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 40px;
  align-items: center;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.25;
  display: flex;
  margin-right: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    width: 20px;
    height: 20px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.25;
  display: flex;
  margin-right: 10px;
  align-items: center;
  > .MuiSvgIcon-root:nth-of-type(1) {
    margin-left: auto;
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.5;
  opacity: 1;
  border-radius: 5px;
  background-color: #421f44;
  text-align: center;
  padding: 0 10px;
  align-items: center;
  color: white;
  border: 1px gray solid;
  > .MuiSvgIcon-root {
    align-items: flex-start_url;
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
  > input {
    background-color: transparent;
    border: none;
    height: 24px;
    text-align: center;
    min-width: 80%;
    outline: 0;
    color: white;
    ::placeholder {
      color: white;
    }
    :focus::placeholder {
      color: transparent;
    }
  }
`;
