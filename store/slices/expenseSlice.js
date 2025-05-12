import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  currentExpense: null,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    setCurrentExpense: (state, action) => {
      state.currentExpense = action.payload;
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setExpenses,
  addExpense,
  setCurrentExpense,
  updateExpense,
  deleteExpense,
  setLoading,
  setError,
} = expenseSlice.actions;

export default expenseSlice.reducer; 