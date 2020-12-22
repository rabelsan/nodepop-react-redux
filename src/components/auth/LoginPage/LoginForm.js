import React from 'react';
import T from 'prop-types';
import { Button, Checkbox, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import useForm from '../../../hooks/useForm';
import styles from './LoginForm.module.css';

function LoginForm({ onSubmit, loading }) {
  const [form, handleChange] = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const { email, password, remember } = form;
  const credentials = { email, password, remember };

  const canSubmit = () => {
    return !loading && email && password;
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        className={styles.input}
        prefix={<MailOutlined />}
        placeholder="Email"
        onChange={handleChange}
        value={email}
      />
      <Input.Password
        name="password"
        className={styles.input}
        prefix={<LockOutlined />}
        placeholder="Password"
        onChange={handleChange}
        value={password}
      />
      <Checkbox
        name="remember"
        className={styles.input}
        onChange={handleChange}
        checked={remember}
      >
        Remember me
      </Checkbox>
      <Button type="primary" htmlType="submit" disabled={!canSubmit()} block>
        Log In
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default LoginForm;
