import React, {useState} from 'react';
import { connect } from 'react-redux';

import T from 'prop-types';
import { Button, Radio, Input, InputNumber, Row, Col } from 'antd';

import { getTags } from '../../../store/selectors';

import TagsSelect from '../TagsSelect';
import { FormField, InputImage } from '../../shared';
import * as numbers from '../../../utils/numbers';

import { saleOptions, MIN_PRICE, MAX_PRICE } from '../definitions';

import styles from './NewAdvertForm.module.css';

function NewAdvertForm ({ onSubmit, list }) {
  const [state, setState] = useState({
    name: '',
    price: 0,
    tags: [],
    photo: null,
    sale: saleOptions.sell.value,
  });

  const canSubmit = () => {
    const { name, price, tags } = state;

    return [
      // valid name
      !!name,
      // valid price
      !Number.isNaN(price) && Number.isFinite(price) && price >= 0,
      // valid tags
      !!tags.length,
    ].every(validation => validation); // all validations pass
  };

  const getFormData = () => {
    const { name, price, tags, sale, photo } = state;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale === saleOptions.sell.value);
    formData.append('price', price);
    tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
    if (photo) formData.append('photo', photo);
    return formData;
  };

  const handleNameChange = ev => setState({ ...state, name: ev.target.value });
  const handlePriceChange = price => setState({ ...state, price });
  const handleTagsChange = tags => setState({ ...state, tags });
  const handlePhotoChange = photo => setState({ ...state, photo });
  const handleSaleChange = ev => setState({ ...state, sale: ev.target.value });

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(getFormData());
  };

  const { name, price, tags, sale } = state;
    
  return (
    <form onSubmit={handleSubmit}>
      <Row className={styles.form}>
        <Col span={11}>
          <FormField label="Name">
            <Input
              placeholder="Name"
              onChange={handleNameChange}
              value={name}
            />
          </FormField>
          <FormField label="Price">
            <InputNumber
              {...numbers}
              className={styles.price}
              min={MIN_PRICE}
              max={MAX_PRICE}
              onChange={handlePriceChange}
              value={price}
            />
          </FormField>
        </Col>
        <Col span={11} offset={2}>
          <FormField label="Tags">
            <TagsSelect onChange={handleTagsChange} options={list} value={tags}/>
          </FormField>
          <FormField label="Type">
            <Radio.Group
              options={[saleOptions.sell, saleOptions.buy]}
              onChange={handleSaleChange}
              value={sale}
            />
          </FormField>
        </Col>
        <Col span={24}>
          <FormField label="Photo">
            <InputImage type="file" onChange={handlePhotoChange} />
          </FormField>
          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            disabled={!canSubmit()}
            block
          >
            Up!
          </Button>
        </Col>
      </Row>
    </form>
  );
}

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
  list: T.arrayOf(T.string),
};

export default connect(getTags) (NewAdvertForm);
