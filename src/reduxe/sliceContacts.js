import { nanoid } from 'nanoid';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const contactsInitialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactsSlice = createSlice({
  name: 'allContacts',
  //Прийщлось через обʼєкт роюити, бо redux-persist не зберігає одразу масив
  initialState: { contacts: contactsInitialState },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(newContact) {
        return {
          payload: { ...newContact, id: nanoid(), edit: false },
        };
      },
    },

    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },

    editContact(state, action) {
      for (const contact of state.contacts) {
        if (contact.id === action.payload) {
          contact.edit = !contact.edit;
          break;
        }
      }
    },

    saveContact(state, action) {
      for (const contact of state.contacts) {
        if (contact.id === action.payload.id) {
          contact.name = action.payload.name;
          contact.number = action.payload.number;
          contact.edit = !contact.edit;
          break;
        }
      }
    },
  },
});

// ! persistStore
const persistConfig = {
  key: 'contacts',
  storage,
  stateReconciler: hardSet,
};

export const { addContact, deleteContact, editContact, saveContact } =
  contactsSlice.actions;

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
