import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './slices/tripSlice';
import expenseReducer from './slices/expenseSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    trips: tripReducer,
    expenses: expenseReducer,
    auth: authReducer,
  },
}); 