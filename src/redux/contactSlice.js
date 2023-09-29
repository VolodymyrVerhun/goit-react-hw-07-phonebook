// const { createSlice } = require('@reduxjs/toolkit');
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getContacts, postContact, removeContact } from 'components/servises/api';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, thunkAPI) => {
  try {
    return await getContacts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('users/addContact', async (body, thunkAPI) => {
  const response = await postContact(body);
  return await response.json();
});
export const deleteContact = createAsyncThunk('users/deleteContact', async (id, thunkAPI) => {
  const response = await removeContact(id);
  return await response.json();
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
        state.contacts.isLoading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(elment => {
          return elment.id !== action.payload.id;
        });
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
