import React from 'react';
import T from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

function TagsSelect ({onChange, tags}) {
  return (
    <Select
      allowClear
      disabled={!tags}
      mode="multiple"
      placeholder="Select tags"
      style={{ width: '100%' }}
    >
      {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

TagsSelect.propTypes = {
  onChange: T.func.isRequired,
};

export default TagsSelect;

