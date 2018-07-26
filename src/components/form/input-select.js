import React from 'react';
import Select from 'react-select';

const inputSelect = (props) => {
  const { allPopulatedFields, field, selectOptions } = props;
  return (
    <Select
      {...props}
      options={selectOptions}
      value={allPopulatedFields[field] && selectOptions.find(option => option.value === allPopulatedFields[field])}
    />
  );
};

export default inputSelect;
