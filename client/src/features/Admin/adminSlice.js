import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/admin/';
const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

// --- ASYNC THUNKS ---

// Get all users
export const getAllUsers = createAsyncThunk('admin/getUsers', async (_, thunkAPI) => {
    try {
        const token = getToken(thunkAPI);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(API_URL + 'users', config);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Get all disputed contracts
export const getDisputedContracts = createAsyncThunk('admin/getDisputes', async (_, thunkAPI) => {
    try {
        const token = getToken(thunkAPI);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(API_URL + 'disputes', config);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Resolve a disputed contract
export const resolveDispute = createAsyncThunk('admin/resolveDispute', async ({ contractId, resolutionStatus }, thunkAPI) => {
    try {
        const token = getToken(thunkAPI);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(
            `${API_URL}disputes/${contractId}/resolve`,
            { resolutionStatus }, // The backend expects a 'resolutionStatus' in the body
            config
        );
        return response.data; // Returns the updated contract
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const initialState = {
  users: [],
  disputes: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => {
      // Keep users loaded but reset other states
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
        // Get all users
        .addCase(getAllUsers.pending, (state) => { state.isLoading = true; })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        // Get disputed contracts
        .addCase(getDisputedContracts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getDisputedContracts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.disputes = action.payload;
        })
        .addCase(getDisputedContracts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        // Resolve a dispute
        .addCase(resolveDispute.pending, (state) => {
            // Can set a specific loading state if needed, e.g., state.isResolving = true
        })
        .addCase(resolveDispute.fulfilled, (state, action) => {
            // Remove the resolved contract from the local state for an immediate UI update
            state.disputes = state.disputes.filter(
                (dispute) => dispute._id !== action.payload._id
            );
        })
        .addCase(resolveDispute.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload; // Show an error if resolution fails
        });
  }
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;