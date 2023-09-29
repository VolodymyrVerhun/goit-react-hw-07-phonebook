import { createSelector } from '@reduxjs/toolkit';

export const selectFilterValue = state => state.filter;
export const selectContacts = state => state.contacts;

export const selectFilterContacts = createSelector(
  [selectContacts, selectFilterValue],
  (contacts, value) => {
    const normalizedValue = value.toLowerCase().trim();
    // return contacts.contacts.items;
    return contacts.contacts.items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue)
    );
  }
);
