import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
    },
    addTrip: (state, action) => {
      state.trips.push(action.payload);
    },
    setCurrentTrip: (state, action) => {
      state.currentTrip = action.payload;
    },
    updateTrip: (state, action) => {
      const index = state.trips.findIndex(trip => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
    },
    deleteTrip: (state, action) => {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
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
  setTrips,
  addTrip,
  setCurrentTrip,
  updateTrip,
  deleteTrip,
  setLoading,
  setError,
} = tripSlice.actions;

export default tripSlice.reducer; 