import React from 'react';
import T from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

function TagsSelect ({onChange, options, defaultValue}) {
  return (
    <Select
      allowClear
      disabled={!options}
      mode="multiple"
      placeholder="Select tags"
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ width: '100%' }}
    >
      {options && options.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

TagsSelect.propTypes = {
  onChange: T.func.isRequired,
  options: T.arrayOf(T.string).isRequired,
  value: T.arrayOf(T.string),
};

export default TagsSelect;

