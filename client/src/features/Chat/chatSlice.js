import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Example async thunk for fetching history
export const getChatHistory = createAsyncThunk('chat/getHistory', async (userId, thunkAPI) => {
  // ... API call logic ...
});

const initialState = {
  conversations: {}, // Key: other user's ID, Value: array of messages
  activeChat: null,
  status: 'idle',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Action to add a new message received via WebSocket or sent by user
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = [];
      }
      state.conversations[conversationId].push(message);
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunks like getChatHistory here
  }
});

export const { addMessage, setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;