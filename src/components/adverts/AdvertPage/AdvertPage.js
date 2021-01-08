import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { Divider, Image, Typography, Statistic, Row, Col, Empty } from 'antd';

import { deleteAd } from '../../../store/actions';
import { getAds, getAdvertById } from '../../../store/selectors';

import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../../assets/photo-placeholder.png';
import Tags from '../Tags';
import { formatter } from '../../../utils/numbers';

const { Title } = Typography;
function AdvertPage ({ loading, error: errorDelete, delAd, history })  {
  const [form, setForm] = useState({
    advert: null,
    error: null,
  }); 

  const { id } = useParams();
  const advert = useSelector(getAdvertById(id));

  useEffect( () => {
    if (!advert) {
      setForm ({ ...form, error: { message: 'Not found' }});
    } else {
      setForm({ ...form, advert: advert });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [advert]
  );  
  
  const handleDeleteClick = () => {
    const { advert } = form;
    delAd(advert._id);
    if (!errorDelete) {
      history.push('/');
    }  
  };

  const renderErrorDelete = (errorDelete) => {
    if (errorDelete) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span style={{ color: '#ff4d4f' }}>{`${errorDelete === null ? '' : errorDelete}`}</span>}
        />
      )
    }
  }

  const renderAdvert = () => {
    const { advert, error } = form;

    if (error) {
      return <Redirect to="/404" />;
    }

    if (!advert) {
      return null;
    }

    const { name, price, tags, sale, photoUrl } = advert;

    return (
      <Row>
        <Col span={24}>
          <Title level={2}>
            {name} - {sale ? 'Sell' : 'Buy'}
          </Title>
        </Col>
        <Col span={12}>
          <Statistic title="Price" value={price} formatter={formatter} />
          <div style={{ marginTop: 20 }}>
            <span style={{ marginRight: 5 }}>Tags</span>
            <Tags tags={tags} />
          </div>
        </Col>
        <Col span={12}>
          <Image
            src={photoUrl}
            alt={name}
            width={300}
            height={300}
            fallback={placeholder}
          />
        </Col>
        <ConfirmationButton
          disabled = {loading}
          danger
          icon={<DeleteOutlined />}
          confirmationProps={{
            title: 'Delete advert?',
            content: 'Are you sure you want to delete this advert?',
            okText: 'Yes',
            cancelText: 'No',
            okButtonProps: {
              danger: true,
            },
          }}
          onConfirm={handleDeleteClick}
          style={{ marginTop: 20 }}
          block
        >
          Delete
        </ConfirmationButton>
        {renderErrorDelete(errorDelete)}
      </Row>
    );
  };

  return (
    <Layout title="Advert detail">
      <Divider>Detail of your advert</Divider>
      {renderAdvert()}
    </Layout>
  );
}

AdvertPage.propTypes = {
  delAd: T.func.isRequired,
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

export default connect(getAds, dispatch => ({
  delAd: (id) => dispatch(deleteAd(id)),
}))(AdvertPage);
