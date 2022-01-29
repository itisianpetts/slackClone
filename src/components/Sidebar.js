import React, { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Components
import { SidebarItem, InputField } from './index';

//Firestore
import { db } from '../firebase';
import { onSnapshot, collection, orderBy, query } from '@firebase/firestore';

// Styles & Icons
import styled from 'styled-components';
import logo from '../imgs/slacknew.png';
import Tooltip from '@mui/material/Tooltip';
import {
  FiberManualRecord,
  Create,
  BookmarkBorder,
  ExpandLess,
  ExpandMore,
  Groups,
  InsertComment,
  FileCopy,
  Mail,
  Person,
  Apps,
  Add,
  AlternateEmail,
} from '@mui/icons-material';

// Component
const Sidebar = () => {
  // Redux
  const user = useSelector((state) => state.user.user);

  // Component State
  const [toggleChannels, setToggleChannels] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [createInput, setCreateInput] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const showMenu = () => setToggleMenu(!toggleMenu);
  const showChannels = () => setToggleChannels(!toggleChannels);
  const showInput = () => setCreateInput(!createInput);

  // Get channel from Database
  useEffect(() => {
    const channelCollectionRef = collection(db, 'channels');
    const q = query(channelCollectionRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChannelList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      // console.log('Snapshot Called');
    });
    return unsubscribe;
  }, []);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarHeaderLeft>
          <div>
            <img src={logo} alt="slack-logo" />
            <h2>Slack</h2>
          </div>

          <h3>
            <FiberManualRecord />
            {user?.displayName}
          </h3>
        </SidebarHeaderLeft>
        <SidebarHeaderRight>
          <Tooltip title="New Message" arrow>
            <Create />
          </Tooltip>
        </SidebarHeaderRight>
      </SidebarHeader>

      <SidebarItem Icon={InsertComment} title="Threads" />
      <SidebarItem Icon={AlternateEmail} title="Mentions" />
      <SidebarItem Icon={BookmarkBorder} title="Channels" />

      {/* Open and close menu drop down */}
      <div onClick={showMenu}>
        <SidebarItem
          Icon={toggleMenu ? ExpandLess : ExpandMore}
          title={toggleMenu ? 'Show less' : 'Show more'}
        />
      </div>
      <div style={{ paddingLeft: '30px' }}>
        {toggleMenu ? (
          <div>
            <SidebarItem Icon={Mail} title="Inbox" />
            <SidebarItem Icon={Person} title="Users" />
            <SidebarItem Icon={Groups} title="Groups" />
            <SidebarItem Icon={FileCopy} title="Files" />
            <SidebarItem Icon={Apps} title="Apps" />
          </div>
        ) : (
          ''
        )}
      </div>
      <hr />
      {/* Open and close menu drop down */}

      {/* Open and close Create Channel drop down */}
      <div onClick={showInput}>
        <SidebarItem
          Icon={createInput ? ExpandLess : Add}
          title={createInput ? 'Hide' : 'Add Channel'}
        />
      </div>
      <div>
        {createInput ? (
          <div>
            <InputField />
          </div>
        ) : (
          ''
        )}
      </div>
      <hr />
      {/* Open and close Create Channel drop down */}

      {/* Open and close channel drop down */}
      <div onClick={showChannels}>
        <SidebarItem
          Icon={toggleChannels ? ExpandMore : ExpandLess}
          title={toggleChannels ? 'Hide Channels' : 'Show Channels'}
        />
      </div>
      <div>
        {toggleChannels ? (
          <div>
            {channelList.map((channel) => (
              <SidebarItem
                key={channel.id}
                id={channel.id}
                title={channel.data.name}
                isChannel
              />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <hr />
      {/* Open and close channel drop down */}
    </SidebarContainer>
  );
};

export default Sidebar;

// Styled Components
const SidebarContainer = styled.div`
  background-color: var(--slack-pre-hover-color);
  color: white;
  border-top: 1px solid #49274b;
  flex: 0.3;
  margin-top: 40px;
  max-width: 260px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  :hover {
    opacity: 0.9;
    background-color: var(--slack-color);
  }
`;

const SidebarHeaderLeft = styled.div`
  flex: 1;
  > div {
    display: flex;
  }
  img {
    width: 20px;
    height: 20px;
    padding-right: 5px;
  }
  h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-weight: 400;
    font-size: 13px;
    padding-left: 3px;
    padding-top: 2px;
    align-items: center;
    > .MuiSvgIcon-root {
      font-size: 14px;
      margin-right: 5px;
      color: green;
    }
  }
`;

const SidebarHeaderRight = styled.div`
  display: flex;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`;
