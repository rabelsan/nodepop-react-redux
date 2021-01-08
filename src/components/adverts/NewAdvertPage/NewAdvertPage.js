import React, { useState } from 'react';
import { connect } from 'react-redux';

import T from 'prop-types';
import { Alert, Divider } from 'antd';

import { createAd } from '../../../store/actions';
import { getAdStatus } from '../../../store/selectors';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
function NewAdvertPage ({ history, newAd, processing, errChange, result }) {
  const [state, setState] = useState({
    error: null,
  });

  const handleSubmit = advert => {
    this.resetError();
    createAd(advert);
    if (errChange) {
      setState(errChange);
    } else {
      history.push(`/adverts/${result._id}`);
    }
  };

  const resetError = () => setState({ error: null });

  const { error } = state;

  return (
    <Layout title="New advert">
      <Divider>Create an advert</Divider>
      <NewAdvertForm onSubmit={handleSubmit} />
      {error && (
        <Alert
          afterClose={resetError}
          closable
          message={error}
          showIcon
          type="error"
        />
      )}
    </Layout>
  );
}

NewAdvertPage.propTypes = {
  history: T.shape({ push: T.func.isRequired }).isRequired,
  newAd: T.func.isRequired,
  processing: T.bool.isRequired,
  errChange: T.string,
  result: T.object,
};

export default connect(getAdStatus, dispatch => ({
  newAd: (id) => dispatch(createAd(id)),
}))(NewAdvertPage);
