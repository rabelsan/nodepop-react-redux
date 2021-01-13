import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import T from 'prop-types';
import { Alert, Divider } from 'antd';

import { createAd, adResetDetails, loadAd } from '../../../store/actions';
import { getAdDetails } from '../../../store/selectors';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
function NewAdvertPage ({ history, resetAd, newAd, getAd, errChange, advert, isNew }) {
  /* const [form, setForm] = useState({
    error: null,
  }); */

  /* useEffect ( () => {
    if (errChange) {
      setForm({ ...form, error: errChange});
    }}, [errChange]
  ); */

  useEffect ( () => {
    if (advert && isNew) {
      if (!advert.hasOwnProperty('photoUrl')) {
        getAd(advert._id, isNew);
      } else {
        history.push(`/adverts/${advert._id}`);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [advert, isNew]
  );

  /* useEffect ( () => {
    if (advert) {
      resetAd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, []
  ); */

  const handleSubmit = advertFormData => {
    //resetError();
    newAd(advertFormData);
  };

  // const resetError = () => setForm({ error: null });

  //const { error } = form;

  return (
    <Layout title="New advert">
      <Divider>Create an advert</Divider>
      <NewAdvertForm onSubmit={handleSubmit} />
      {errChange && (
        <Alert
          //afterClose={resetError}
          closable
          message={errChange}
          showIcon
          type="error"
        />
      )}
    </Layout>
  );
}

NewAdvertPage.propTypes = {
  history: T.shape({ push: T.func.isRequired }).isRequired,
  resetAd: T.func.isRequired,
  newAd: T.func.isRequired,
  getAd: T.func.isRequired,
  processing: T.bool,
  errChange: T.string,
  advert: T.object,
  isNew: T.bool,
};

export default connect(getAdDetails, dispatch => ({
  resetAd: () => dispatch(adResetDetails()),
  newAd: (id) => dispatch(createAd(id)),
  getAd: (id, isNew) => dispatch(loadAd(id, isNew)),
}))(NewAdvertPage);
