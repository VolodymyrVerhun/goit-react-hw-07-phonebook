import axios from 'axios';

export const getContacts = async () => {
  const { data } = await axios.get(
    'https://6512d783b8c6ce52b39656c7.mockapi.io/contacts'
  );
  return data;
  //   return await fetch('https://6512d783b8c6ce52b39656c7.mockapi.io/contacts');
};

export const postContact = async body => {
  return await fetch('https://6512d783b8c6ce52b39656c7.mockapi.io/contacts', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const removeContact = async id => {
  return await fetch(
    `https://6512d783b8c6ce52b39656c7.mockapi.io/contacts/${id}`,
    {
      method: 'DELETE',
    }
  );
};
