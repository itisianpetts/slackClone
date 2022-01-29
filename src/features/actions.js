import { actionTypes } from './action-types';

export const setChannelId = (channelId) => {
  return {
    type: actionTypes.SET_CHANNEL_ID,
    payload: channelId,
  };
};

export const setChannelName = (channelName) => {
  return {
    type: actionTypes.SET_CHANNEL_NAME,
    payload: channelName,
  };
};

export const login = ({ email, uid, displayName, photoURL }) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      email: email,
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.REMOVE_USER,
    payload: null,
  };
};
