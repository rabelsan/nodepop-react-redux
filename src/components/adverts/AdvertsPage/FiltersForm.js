import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Button, Input, Slider, Radio, Row, Col } from 'antd';

import TagsSelect from '../TagsSelect';
import FormField from '../../shared/FormField';
import { saleOptions, MIN_PRICE, MAX_PRICE } from '../definitions';
import styles from './FiltersForm.module.css';

import {loadTags} from '../../../store/actions';
import {getTags} from '../../../store/selectors';

export const defaultFilters = {
  name: '',
  sale: saleOptions.all.value,
  price: [],
  tags: [],
};

function FiltersForm ({findTags, list, initialFilters, onSubmit}) {
  const [filters, setFilters] = useState(initialFilters);

  useEffect( 
    () => { findTags(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []
  );


  const handleNameChange = ev => setFilters({ ...filters, name: ev.target.value });
  const handlePriceChange = price => {
    const [min, max] = price;
    if (min === MIN_PRICE && max === MAX_PRICE) {
      return setFilters({ price: [] });
    }
    setFilters({...filters, price });
  };
  const handleSaleChange = ev => setFilters({...filters, sale: ev.target.value });
  const handleTagsChange = tags => {
    setFilters({...filters, tags });
  }

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(filters);
  };

  const { name, price, tags, sale } = filters;
  const priceValue = price.length === 0 ? [MIN_PRICE, MAX_PRICE] : price;

  return (
    <form onSubmit={handleSubmit}>
      <Row className={styles.form}>
        <Col span={11}>
          <FormField label="By name">
            <Input
              placeholder="Name"
              onChange={handleNameChange}
              value={name}
            />
          </FormField>
          <FormField
            label={
              <>
                By price
                <strong style={{ margin: '0 5px' }}>
                  {priceValue.join(' - ')}
                </strong>
              </>
            }
          >
            <Slider
              range
              defaultValue={priceValue}
              min={MIN_PRICE}
              max={MAX_PRICE}
              onChange={handlePriceChange}
            />
          </FormField>
        </Col>
        <Col span={11} offset={2}>
          <FormField label="By tags">
            <TagsSelect onChange={handleTagsChange} options={list} defaultValue={tags}/>
          </FormField>
          <FormField label="By type">
            <Radio.Group
              options={Object.values(saleOptions)}
              onChange={handleSaleChange}
              value={sale}
            />
          </FormField>
        </Col>
        <Col span={24}>
          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            block
          >
            Search
          </Button>
        </Col>
      </Row>
    </form>
  );
}

FiltersForm.propTypes = {
  initialFilters: T.shape({
    name: T.string,
    sale: T.oneOf(Object.keys(saleOptions)),
    price: T.arrayOf(T.number),
    tagsList: T.arrayOf(T.string),
  }),
  onSubmit: T.func.isRequired,
};

FiltersForm.defaultProps = {
  initialFilters: defaultFilters,
};

export default connect(getTags, dispatch => ({
  findTags: () => dispatch(loadTags()),
}))(FiltersForm);
