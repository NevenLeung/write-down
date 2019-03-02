import React from 'react';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import styles from './Login.module.css';

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { form, userLogin, saveLoginData, closeModal } = this.props;
    const { username, password, rememberMe } = form.getFieldsValue();

    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
      }

      // It saves login data depending on 'rememberMe'.
      if (rememberMe) {
        saveLoginData({ username, password });
      } else {
        saveLoginData({ username: '', password: '' });
      }

      if (username === 'test' && password === '123456') {
        userLogin();
        closeModal();

        message.success('Login successfully.');
      } else if (username === 'test') {
        form.setFields({
          password: {
            value: values.password,
            errors: [new Error('Please make sure the password is correct.')]
          }
        });
        message.warn('Login failed. Please make sure the password is correct.');
      } else if (password === '123456') {
        form.setFields({
          username: {
            value: values.username,
            errors: [new Error('Please make sure the username is correct.')]
          }
        });
        message.warn('Login failed. Please make sure the username is correct.');
      } else {
        form.setFields({
          username: {
            value: values.username,
            errors: [new Error('Please make sure the username is correct.')]
          },
          password: {
            value: values.password,
            errors: [new Error('Please make sure the password is correct.')]
          }
        });
        message.warn('Login failed. Please make sure the username or password are both correct.');
      }
    });
  };

  render() {
    const { username, password } = this.props.loginData;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: username,
            rules: [
              {
                required: true,
                message: 'Please input your username!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" className={styles.inputPrefix} />}
              placeholder="Username"
              autoComplete='off'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: password,
            rules: [
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" className={styles.inputPrefix}/>}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rememberMe', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block={true}
          >
            Log in
          </Button>
          {/*Or <a href="">register now!</a>*/}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export { WrappedLoginForm };