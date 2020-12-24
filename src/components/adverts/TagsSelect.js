import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'; 
import T from 'prop-types';
import { Select } from 'antd';

import {tags} from '../../store/actions';
import { getTags } from '../../store/selectors';

const { Option } = Select;

function TagsSelect (...props) {
  const [tags, setTags] = useState(null);
  console.log(...props);

  useEffect( 
    () => { 
      //findTags();
      setTags(getTags().list);
    } ,
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

TagsSelect.propTypes = {
  onChange: T.func.isRequired,
};

export default connect(getTags, dispatch => ({
  findTags: () => dispatch(tags()),
}))(TagsSelect);

