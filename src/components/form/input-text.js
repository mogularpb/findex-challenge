import React from 'react';

const inputText = (props) => {
  const {
    field, placeholder, useOnBlur, useOnChange, onBlur, onChange,
  } = props;
  return (
    <input
      type="text"
      id={field}
      className="form-control"
      placeholder={placeholder}
      required=""
      onBlur={useOnBlur && onBlur}
      onChange={useOnChange && onChange}
    />
  );
};

export default inputText;
