import React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { setChannelId, setChannelName } from '../features/actions';

// Styles & Icons
import styled from 'styled-components';

// Component
export default function SidebarItem({ Icon, title, id, isChannel }) {
  // Redux
  const dispatch = useDispatch();
  const selectChannel = () => {
    if (id) {
      dispatch(setChannelId(id));
      // console.log('dispatched id: ' + id);
    }
    if (title) {
      dispatch(setChannelName(title));
      // console.log('dispatched title: ' + title);
    }
  };

  // Component
  return (
    <SidebarItemContainer>
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarItemOption onClick={isChannel && selectChannel}>
          <span>#</span>
          {title}
        </SidebarItemOption>
      )}
    </SidebarItemContainer>
  );
}

// Styled Components
const SidebarItemContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: var(--slack-color);
  }
  > h3 {
    font-weight: 500;
  }
`;

const SidebarItemOption = styled.h3`
  padding: 8px 0;
  font-weight: 300;
  span {
    padding: 15px;
  }
`;
