import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  // For the list of contracts
  contracts: [],
  listIsLoading: true,
  
  // For the single contract detail view
  activeContract: null,
  detailIsLoading: true,

  // General state
  isError: false,
  message: '',
};

// --- ASYNC THUNKS ---

// 1. Fetches the LIST of all contracts for the user
export const getContracts = createAsyncThunk(
  'contracts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/api/contracts/', config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// 2. Fetches ONE SINGLE contract by its ID
export const getContractById = createAsyncThunk(
  'contracts/getById',
  async (contractId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`/api/contracts/${contractId}`, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// 3. Updates the STATUS of one single contract
export const updateContractStatus = createAsyncThunk(
  'contracts/updateStatus',
  async ({ contractId, status }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`/api/contracts/${contractId}/status`, { status }, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


// --- THE SLICE ---
export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    reset: (state) => {
        state.activeContract = null;
        state.detailIsLoading = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Reducers for the LIST
      .addCase(getContracts.pending, (state) => { state.listIsLoading = true; })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.listIsLoading = false;
        state.contracts = action.payload;
      })
      .addCase(getContracts.rejected, (state, action) => {
        state.listIsLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Reducers for the SINGLE contract detail view
      .addCase(getContractById.pending, (state) => { state.detailIsLoading = true; })
      .addCase(getContractById.fulfilled, (state, action) => {
        state.detailIsLoading = false;
        state.activeContract = action.payload;
      })
      .addCase(getContractById.rejected, (state, action) => {
        state.detailIsLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Reducer for the STATUS update
      .addCase(updateContractStatus.fulfilled, (state, action) => {
        // Update the active contract in the state instantly
        state.activeContract = action.payload;
        // Also update the contract in the main list if it exists
        const index = state.contracts.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
            state.contracts[index] = action.payload;
        }
      });
  },
});

export const { reset } = contractsSlice.actions;
export default contractsSlice.reducer;