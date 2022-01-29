import React from 'react';

// Firebase
import { auth } from '../firebase';
import { signOut } from '@firebase/auth';

// Redux
import { useSelector } from 'react-redux';

// Icons
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function BadgeAvatars() {
  // Redux
  const user = useSelector((state) => state.user.user);

  // Auth
  const signUserOut = () => {
    signOut(auth);
  };
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <HeaderAvatar
          src={user?.photoURL}
          alt={user?.displayName[0]}
          onClick={signUserOut}
        />
      </StyledBadge>
    </Stack>
  );
}

// Styled Components
const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'green',
    color: 'green',
  },
}));

const HeaderAvatar = styled(Avatar)`
  box-sizing: border-box;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  margin: 5px;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  :hover {
    opacity: 0.8;
    transition: opacity 0.5s ease-in;
  }
`;
