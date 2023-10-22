import { Store } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";


const initialNotificationState = {
  incomingMessages: {},
  totalUnread: 0,
  totalSystemNotifications: 0,
  latestMessages: {}
};

export const notifictationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    setIncomingMessage: (state, action) => {
      const { id } = action.payload;
      const newValue = state.incomingMessages[id] ? state.incomingMessages[id] + 1 : 1;
      state.incomingMessages[id] = newValue;
    },
    setIncomingMessageByValue: (state, action) => {
      const { id } = action.payload;
      const newValue = state.incomingMessages[id] ? state.incomingMessages[id] + action.payload.value : action.payload.value;
      state.incomingMessages[id] = newValue;
    },
    setReadPersonMessage: (state, action) => {
      const { id } = action.payload
      state.totalUnread -= state.incomingMessages[id] ? state.incomingMessages[id] : 0
      state.incomingMessages[id] = 0
    },
    addSystemNotifications: (state) => {
      state.totalSystemNotifications++;
    },
    setSystemNotifications: (state, action) => {
      state.totalSystemNotifications = action.payload.value;
    },
    addTotalUnreadMessages: (state) => {
      state.totalUnread++;
    },
    setTotalUnreadMessages: (state, action) => {
      state.totalUnread = action.payload.value
    },
    setLatestMessage: (state, action) => {
      const { id, message } = action.payload
      state.latestMessages[id] = message
    }

  }

})
export const {
  setIncomingMessage,
  setIncomingMessageByValue,
  addSystemNotifications,
  addTotalUnreadMessages,
  setSystemNotifications,
  setTotalUnreadMessages,
  setReadPersonMessage,
  setLatestMessage } = notifictationSlice.actions
export default notifictationSlice.reducer