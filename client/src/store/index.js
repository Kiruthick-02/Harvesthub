import { configureStore } from '@reduxjs/toolkit';
// CORRECTED IMPORT PATH
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other feature slices here
  },
});