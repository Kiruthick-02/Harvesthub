import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/marketplace/';

const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

// Create new listing
export const createListing = createAsyncThunk('marketplace/create', async (listingData, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL, listingData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Get all listings
export const getListings = createAsyncThunk('marketplace/getAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const initialState = {
  listings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => { state.isLoading = true; })
      .addCase(createListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings.unshift(action.payload);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getListings.pending, (state) => { state.isLoading = true; })
      .addCase(getListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = action.payload;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;