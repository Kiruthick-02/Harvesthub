import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/contracts/';

const initialState = {
  contracts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const getToken = (thunkAPI) => {
    const { auth } = thunkAPI.getState();
    return auth.user.token;
};

// Create new contract
export const createContract = createAsyncThunk('contracts/create', async (contractData, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL, contractData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Get user contracts
export const getContracts = createAsyncThunk('contracts/getAll', async (_, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const contractsSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contracts.push(action.payload);
      })
      .addCase(createContract.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContracts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contracts = action.payload;
      })
      .addCase(getContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contractsSlice.actions;
export default contractsSlice.reducer;