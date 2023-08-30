import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
  
    addContact: (state, action) => {
      state.push(action.payload);
    },
    editContact: (state, action) => {
      const contact = state.find((c) => c.id === action.payload.id);
      if (contact) {
        contact.name = action.payload.name;
        contact.email = action.payload.email;
      }
    },
    deleteContact: (state, action) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
