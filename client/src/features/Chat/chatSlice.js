import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Removed unused 'axios' import.

/**
 * A placeholder async thunk for fetching chat history.
 * This would be implemented later to make an API call to an endpoint
 * like GET /api/chat/:userId
 */
export const getChatHistory = createAsyncThunk(
  'chat/getHistory', 
  async (userId, thunkAPI) => {
    // Placeholder: In the future, API call logic would go here.
    // For now, it does nothing.
    return []; 
  }
);

const initialState = {
  // We will store conversations in an object where the key is the other user's ID
  // and the value is an array of message objects.
  conversations: {}, 
  activeChatUserId: null,
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // This action is dispatched when a new message is received via WebSocket
    // or when the current user sends a message.
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = [];
      }
      state.conversations[conversationId].push(message);
    },
    // This sets which conversation is currently being viewed.
    setActiveChat: (state, action) => {
      state.activeChatUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // This section will handle the states for the getChatHistory thunk
    // once it is fully implemented.
    builder
      .addCase(getChatHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Logic to populate the conversation history would go here
      });
  }
});

export const { addMessage, setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;