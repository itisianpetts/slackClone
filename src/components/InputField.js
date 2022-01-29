import React, { useState } from 'react';

// Styles & Icons
import styled from 'styled-components';

//Firestore
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function InputField() {
  // Component State
  const [channelName, setChannelName] = useState('');

  // Add new channel to Database
  const addChannel = async (e) => {
    e.preventDefault();
    if (!channelName) {
      alert('Add a new channel name!');
    }
    await addDoc(collection(db, 'channels'), {
      name: channelName.toLowerCase(),
      timestamp: serverTimestamp(),
    });
    alert(`New Channel Created: ${channelName}`);
    window.location.reload();
  };

  // Component
  return (
    <>
      <InputSidebarItemContainer onSubmit={(e) => addChannel(e)}>
        <StyledInput
          type="text"
          id="newChannel"
          placeholder="Enter new name..."
          onChange={(e) => setChannelName(e.target.value)}
        />
      </InputSidebarItemContainer>
    </>
  );
}

// Styled Components
const InputSidebarItemContainer = styled.form`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input`
  align-items: center;
  margin: 0 5px;
  width: 80%;
  opacity: 1;
  outline: none;
  height: 24px;
  border-radius: 5px;
  background-color: #421f44;
  text-align: center;
  padding: 0 10px;
  color: white;
  border: 1px gray solid;
  ::placeholder {
    color: white;
  }
  :focus::placeholder {
    color: transparent;
  }
`;
