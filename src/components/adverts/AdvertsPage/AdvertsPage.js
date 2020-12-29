import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Empty, Button, Spin, List, Divider } from 'antd';

import storage from '../../../utils/storage';
import Layout from '../../layout';
import FiltersForm, { defaultFilters } from './FiltersForm';
import AdvertCard from './AdvertCard';

import { loadTags, loadAds } from '../../../store/actions';
import { getAds } from '../../../store/selectors';

function AdvertsPage  ({adverts, loading, error, findAds, ...props}) {
  const [form, setForm] = useState({
    filters: storage.get('filters') || defaultFilters,
  });

  useEffect(
    () => { 
      loadTags();
      findAds(formatFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []
  );
  
  const formatFilters = () => {
    const {
      filters: { name, sale, price, tags } 
    }  = form;
  
    const filters = {};
    if (name) {
      filters.name = name;
    }
    if (['sell', 'buy'].includes(sale)) {
      filters.sale = sale === 'sell';
    }
    if (price.length) {
      filters.price = price.join('-');
    }
    if (tags.length) {
      filters.tags = tags.join(',');
    }

    return filters;
  };

  const handleSubmit = filters => {
    storage.set('filters', filters);
    setForm({...form, filters });
    findAds(filters);
    setForm(...form, { adverts, loading, error });
  };

  const renderLoading = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin size="large" />
    </div>
  );

  const renderError = () => {
    const { error } = form;
    return (
      <Empty
        description={<span style={{ color: '#ff4d4f' }}>{`${error}`}</span>}
      >
        <Button type="primary" danger onClick={loadAds(formatFilters())}>
          Reload
        </Button>
      </Empty>
    );
  };

  const renderEmpty = () => {
    const { filters } = form;
    const isFiltered =
      JSON.stringify(filters) !== JSON.stringify(defaultFilters);
    return (
      <Empty description={<span>No adverts here!</span>}>
        {isFiltered ? (
          <span>Refine your search</span>
        ) : (
          <Link to="/adverts/new">
            <Button type="primary">Create the first one</Button>
          </Link>
        )}
      </Empty>
    );
  };

  const renderAdvert = advert => {
    return (
      <List.Item>
        <Link to={`/adverts/${advert._id}`}>
          <AdvertCard {...advert} />
        </Link>
      </List.Item>
    );
  };

  const renderAdverts = () => {
    if (loading) {
      return renderLoading();
    }

    if (error) {
      return renderError();
    }

    if (!adverts) {
      return null;
    }

    if (!adverts.length) {
      return renderEmpty();
    }

    return (
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={adverts}
        renderItem={renderAdvert}
      />
    );
  };

  return (
    <Layout title="Adverts list">
      <Divider>Filter your adverts</Divider>
      <FiltersForm initialFilters={form.filters} onSubmit={handleSubmit} />
      <Divider>Adverts</Divider>
      {renderAdverts()}
    </Layout>
  );
}

AdvertsPage.propTypes = {
  findAds: T.func.isRequired,
  adverts: T.array.isRequired,
};

export default connect(getAds, dispatch => ({
  findAds: (filters) => dispatch(loadAds(filters)),
}))(AdvertsPage);
