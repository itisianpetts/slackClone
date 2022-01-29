import React, { useState } from 'react';

// Firebase
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from '@firebase/firestore';

// Redux
import { useSelector } from 'react-redux';

// Icons & Styles
import styled from 'styled-components';
import Button from '@mui/material/Button';

export default function ChatInput({ channelId, channelName }) {
  // Redux
  const user = useSelector((state) => state.user.user);

  // Component State
  const [chatMessage, setChatMessage] = useState('');

  // Add message to DB
  const sendMessage = async (e) => {
    const channelMessageRef = collection(
      db,
      'channels',
      `${channelId}`,
      'messages'
    );
    e.preventDefault();
    if (!channelId) {
      alert('Please select a channel to chat');
      return false;
    }
    await addDoc(channelMessageRef, {
      message: chatMessage,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
    setChatMessage('');
  };

  return (
    <StyledChatInput>
      <form>
        <input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          type="text"
          placeholder={
            channelName
              ? `Send message in #${channelName} channel`
              : '# Select a channel to chat'
          }
        />
        <Button type="submit" onClick={(e) => sendMessage(e)} hidden>
          Send
        </Button>
      </form>
    </StyledChatInput>
  );
}

const StyledChatInput = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
    > input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid #a9a9a9;
      border-radius: 3px;
      padding: 20px;
      outline: none;
    }
    > button {
      display: none !important;
    }
  }
`;
