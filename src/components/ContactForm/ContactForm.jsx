import style from './ContactForm.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selector';
import { nanoid } from '@reduxjs/toolkit';
import { addContact, fetchContacts } from 'redux/contactSlice';
import { useEffect } from 'react';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const handleChange = event => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'number') {
      setNumber(event.target.value);
    }
  };

  const submit = event => {
    event.preventDefault();

    if (
      contacts.contacts.items.find(contact => {
        return contact.name === name.trim();
      })
    ) {
      alert(`$(name) is already in contacts`);
      return;
    }
    const newContact = {
      name: name.trim(),
      number: number.trim(),
      id: nanoid(),
    };
    setName('');
    setNumber('');

    dispatch(addContact(newContact));
  };

  return (
    <form className={style.form} onSubmit={submit}>
      <label className={style.label} htmlFor="username">
        Name
      </label>
      <input
        className={style.input}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, 
                 Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={style.label} htmlFor="number">
        Number
      </label>
      <input
        className={style.input}
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={style.btn} type="submit">
        Add contacts
      </button>
    </form>
  );
}
