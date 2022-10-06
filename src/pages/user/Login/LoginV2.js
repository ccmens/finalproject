import React, { useState, useEffect } from "react";
import axios from 'axios';
import LoginForm from "./LoginForm";
import 'antd/dist/antd.min.css';
import './home.css';
import '../../../components/BannerSecion';
import {BannerSection} from '../../../components/BannerSecion'
import { Button, Checkbox, Form, Input, message,Alert } from 'antd';


export default function LoginV2({
  handleAction
}) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
      console.log('Success:', values);
      const result = await handleAction('login', null, values);
      if (result) {
          message.success('Login success');
      }
  };

  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };


  return (
    <>
   <BannerSection title="Welcome To Variable Oscillations-Inventory MGMT" color='white'/>
    <div className='login-wrap'>
        <h3>Login</h3>
      <div className='login-form'>
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" >
          LOG IN
        </Button>
      </Form.Item>
    </Form>
    <Alert
                        message="Test Accounts"
                        description={`
                            admin   ,   password (admin);
                            alec123 ,  password (user);
                            user1 ,    password (user)`}
                        type="info"
                        showIcon
                    />
    </div>
    </div>
    </>
  );
};
