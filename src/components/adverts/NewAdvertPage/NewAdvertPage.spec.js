import React from 'react';
import { shallow } from 'enzyme';

import NewAdvertForm from './NewAdvertForm';
import { createAd }  from '../../../store/actions';
import Layout from '../../layout';
import { Alert, Divider } from 'antd';

describe('NewAdvertPage', () => {
  const newAd = createAd;
  const errChange = 'Error';

  const handleSubmit = advertFormData => {
    newAd(advertFormData);
  };

  const render = () => shallow(
    <Layout title="New advert">
      <Divider>Create an advert</Divider>
      <NewAdvertForm onSubmit={handleSubmit} />
      {errChange && (
        <Alert
          closable
          message={errChange}
          showIcon
          type="error"
        />
      )}
    </Layout>
  );

  
  test('snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
  test('snapshot with title', () => {
    const wrapper = render();
    expect(wrapper.find('Title').getElement().props.children).toBe('New advert');
    expect(wrapper).toMatchSnapshot();
  });

  test('NewAdvertForm should receive onSubmit', () => {
    const wrapper = render();
    expect(wrapper.find('Connect(NewAdvertForm)').getElement().props.onSubmit).toBeDefined();
  });
});
