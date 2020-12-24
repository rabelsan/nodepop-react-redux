import React from 'react';
import { connect } from 'react-redux'; 
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

import { login } from '../../../store/actions';
import LoginForm from './LoginForm';
import { getUi } from '../../../store/selectors';


const { Title } = Typography;

function LoginPage ({ onLogin, loading, error}) {
  return (
    <Row>
      <Col span={8} offset={8} style={{ marginTop: 64 }}>
        <Title style={{ textAlign: 'center' }}>Log In</Title>
        <LoginForm onSubmit={onLogin} loading={loading}/>
        {error && (
          <Alert
            closable 
            message={error}
            showIcon
            type="error"
            style={{ marginTop: 24 }}
          />
        )}
      </Col>
    </Row>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
  loading: T.bool.isRequired,
  error: T.string,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

export default connect(getUi, dispatch => ({
  onLogin: (crendentials, history) => dispatch(login(crendentials, history)),
}))(LoginPage);

