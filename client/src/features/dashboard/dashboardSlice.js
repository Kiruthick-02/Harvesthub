import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  actionItems: [],
  displayWidgets: {
    recentSales: [],
    winningBids: [],
  },
  isLoading: true,
  isError: false,
  message: '',
};

// This asyncThunk will fetch the live data from our new backend endpoint
export const getDashboardData = createAsyncThunk(
  'dashboard/getData',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/api/dashboard', config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.actionItems = action.payload.actionItems;
        state.displayWidgets = action.payload.displayWidgets;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;