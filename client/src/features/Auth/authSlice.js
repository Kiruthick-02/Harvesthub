import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api'; // Import our new, real API service

// Get user and token from browser's local storage if they exist
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// --- REAL API ASYNC THUNKS ---

// Register User
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    // Make the API call to your backend's registration endpoint
    const response = await API.post('/auth/register', userData);

    // If successful, the backend sends back the user object and token.
    // We save them to localStorage to keep the user logged in.
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    // If the API call fails (e.g., email already exists), the backend
    // sends an error message. We capture that message to show to the user.
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login User
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await API.post('/auth/login', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout User
export const logout = createAsyncThunk('auth/logout', async () => {
  // We just need to clear the data from storage.
  localStorage.removeItem('user');
  localStorage.removeItem('token');
});

// The slice defines how our state changes in response to the API calls
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // A standard reducer to reset the state (e.g., clear errors)
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  // extraReducers handle the states of our async thunks (pending, success, failure)
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // Set user from the successful API response
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Set the error message from the API
        state.user = null;
        state.token = null;
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      })
      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;