import React, { useEffect } from 'react';
import T from 'prop-types';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Divider, Image, Typography, Statistic, Row, Col, Empty } from 'antd';

import { loadAd, deleteAd } from '../../../store/actions';
import { getAdDetails } from '../../../store/selectors';

import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import placeholder from '../../../assets/photo-placeholder.png';
import Tags from '../Tags';
import { formatter } from '../../../utils/numbers';

const { Title } = Typography;
function AdvertPage ({ history, delAd, getAd, processing, errChange, advert })  {
  const { id } = useParams();
  
  useEffect( () => {
      getAd(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]
  );
  
  const handleDeleteClick = () => {
    //const { advert } = form;
    if (advert) {
      delAd(advert._id).then(history.push('/'));
    }  
  };

  const rendererrChange = (errChange) => {
    if (errChange) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span style={{ color: '#ff4d4f' }}>{`${errChange === null ? '' : errChange}`}</span>}
        />
      )
    }
  }

  const renderAdvert = () => {
    if (errChange) {
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
          disabled = {processing}
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
        {rendererrChange(errChange)}
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
  history: T.shape({ push: T.func.isRequired }).isRequired,
  delAd: T.func.isRequired,
  getAd: T.func.isRequired,
  processing: T.bool,
  errChange: T.string,
  advert: T.object,
};

export default connect(getAdDetails, dispatch => ({
  delAd: (id) => dispatch(deleteAd(id)),
  getAd: (id) => dispatch(loadAd(id)),
}))(AdvertPage);
