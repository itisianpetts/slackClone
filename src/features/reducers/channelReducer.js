import { actionTypes } from '../action-types';

const initialState = {
  channelId: null,
  channelName: '',
};

export const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNEL_ID:
      return { ...state, channelId: action.payload };
    case actionTypes.SET_CHANNEL_NAME:
      return { ...state, channelName: action.payload };
    default:
      return state;
  }
};
