import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Empty, Button, Spin, List, Divider } from 'antd';

import storage from '../../../utils/storage';
import Layout from '../../layout';
import FiltersForm, { defaultFilters } from './FiltersForm';
import AdvertCard from './AdvertCard';

import { loadTags, loadAds } from '../../../store/actions';
import { getTags, getAds } from '../../../store/selectors';

function AdvertsPage  () {
  const [form, setForm] = useState({
    adverts: null,
    loading: false,
    error: null,
    filters: storage.get('filters') || defaultFilters,
  });

  const store = useStore();
  console.log(store.getTags(store));

  useEffect(
    () => { loadTags(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []
  );

  useEffect(
    () => { loadAds(formatFilters()); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [form.filters]
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
    const { adverts, loading, error } = form;

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

export default connect(getAds, dispatch => ({
  loadAds: (filters) => dispatch(loadAds(filters)),
}))(AdvertsPage);
