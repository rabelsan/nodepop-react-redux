import React, {useState, useEffect} from 'react';
import { Select } from 'antd';

import { getTags } from '../../api/adverts';

const { Option } = Select;

function TagsSelect () {
  const [tags, setTags] = useState(null);

  useEffect( 
    () => setTags(),
    [tags]
  );

  return (
    <Select
      allowClear
      disabled={!tags}
      mode="multiple"
      placeholder="Select tags"
      style={{ width: '100%' }}
      {...props}
    >
      {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

export default TagsSelect;
