import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    // ... other reducers if you have them
  },
});

export default store;
