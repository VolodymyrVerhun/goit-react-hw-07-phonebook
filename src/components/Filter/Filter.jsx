import React from 'react';

import style from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterValue } from 'redux/selector';
import { setFilterValue } from 'redux/filterSlice';

export default function Filter() {
  const value = useSelector(selectFilterValue);
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(setFilterValue(e.target.value));
  };
  return (
    <>
      <label className={style.label} htmlFor="number">
        Find contacts by name
      </label>
      <input
        className={style.input}
        onChange={handleChange}
        value={value}
        type="text"
      />
    </>
  );
}
