import React, { useEffect, useRef, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Firebase
import { collection, orderBy, query, onSnapshot } from '@firebase/firestore';
import { db } from '../firebase';

// Components
import { ChatInput, Message } from './index';

// Icons & Styles
import styled from 'styled-components';
import PushPin from '@mui/icons-material/PushPin';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import logo from '../imgs/slacknew.png';

const Chat = () => {
  // Component State
  const [channelMessages, setChannelMessages] = useState([]);
  const chatRef = useRef(null);

  // Redux
  const channelId = useSelector((state) => state.channel.channelId);
  const channelName = useSelector((state) => state.channel.channelName);

  // Get Channels from DB
  useEffect(() => {
    const messageRef = collection(db, 'channels', `${channelId}`, 'messages');
    if (channelId) {
      const q = query(messageRef, orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setChannelMessages(
          snapshot.docs.map((doc) => {
            return {
              data: doc.data(),
              id: doc.id,
            };
          })
        );
      });
      return unsubscribe;
    }
  }, [channelId]);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [channelMessages]);

  return (
    <ChatContainer>
      {channelMessages && channelId ? (
        <>
          <ChatHeader>
            <ChatHeaderLeft>
              {channelName ? <h4># {channelName}</h4> : ''}
            </ChatHeaderLeft>
            <ChatHeaderRight>
              <PushPin />
              <InfoOutlined />
            </ChatHeaderRight>
          </ChatHeader>

          <ChatMessages>
            {channelMessages.map((message) => (
              <Message
                key={message.id}
                message={message.data.message}
                timestamp={message.data.timestamp}
                userName={message.data.user}
                userImage={message.data.userImage}
              />
            ))}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput channelName={channelName} channelId={channelId} />
        </>
      ) : (
        <>
          <HoldingContainer>
            <h1>Please add or select a channel</h1>
            <img src={logo} alt="slack-logo" />
          </HoldingContainer>
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 100px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 40px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #d3d3d3;
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
  }
`;

const ChatHeaderRight = styled.div`
  display: flex;
  align-items: center;
  > .MuiSvgIcon-root:nth-of-type(1) {
    transform: rotate(45deg);
    font-size: 18px;
  }
  > .MuiSvgIcon-root:nth-of-type(2) {
    font-size: 18px;
    padding-left: 5px;
  }
`;

const HoldingContainer = styled.div`
  text-align: center;
  h1 {
    color: black;
    font-weight: 600;
    padding-top: 50px;
  }
  img {
    width: 200px;
    height: 200px;
    padding: 100px;
  }
`;
