import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contractsReducer from '../features/contracts/contractsSlice';
import marketplaceReducer from '../features/Marketplace/marketplaceSlice';
import adminReducer from '../features/Admin/adminSlice';
import chatReducer from '../features/Chat/chatSlice';
import notificationsReducer from '../features/Notifications/notificationsSlice';
import auctionReducer from '../features/auction/auctionSlice'; // 1. IMPORT THE NEW REDUCER
import dashboardReducer from '../features/dashboard/dashboardSlice'; 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    contracts: contractsReducer,
    marketplace: marketplaceReducer,
    admin: adminReducer,
    chat: chatReducer,
    notifications: notificationsReducer,
    auction: auctionReducer, 
    dashboard: dashboardReducer, 
  },
});