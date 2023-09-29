import React from 'react';

import ContactItem from './ContactItem';
import style from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterContacts } from 'redux/selector';
import { deleteContact } from 'redux/contactSlice';

export default function ContactList() {
  const contacts = useSelector(selectFilterContacts);
  const dispatch = useDispatch();

  return (
    <ul className={style.list}>
      {contacts &&
        contacts.map(contact => {
          return (
            <ContactItem
              deleteContact={() => dispatch(deleteContact(contact.id))}
              key={contact.id}
              contact={contact}
            />
          );
        })}
    </ul>
  );
}
