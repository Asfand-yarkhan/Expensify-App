import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseReducer';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
  },
});

export default store; 