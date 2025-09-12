import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contractsReducer from '../features/Contracts/contractsSlice';
import marketplaceReducer from '../features/Marketplace/marketplaceSlice';
import adminReducer from '../features/Admin/adminSlice';
import chatReducer from '../features/Chat/chatSlice';
import notificationsReducer from '../features/Notifications/notificationsSlice';

// configureStore is the main function to create the Redux store.
// The `reducer` object automatically combines all your slice reducers.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    contracts: contractsReducer,
    marketplace: marketplaceReducer,
    admin: adminReducer,
    chat: chatReducer,
    notifications: notificationsReducer,
    // Add other feature reducers here as you create them
  },
});