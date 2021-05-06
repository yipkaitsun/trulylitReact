import Head from 'next/head';
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, notification} from 'antd';
import axios from 'axios'
import Cookies from 'universal-cookie';
import PageIndicator from '../components/pageIndicator';
import { UserOutlined, LockOutlined,WarningOutlined } from '@ant-design/icons';

const cookies = new Cookies();

class login extends Component {
    constructor(props){
        super(props);
        this.state={
            login:false,
        }
       
    }
    openNotification = (title,msg,icon) => {
        notification.open({
          message: title,
          description:msg,
          icon:icon,
  
        });
      };
      
       onFinish =    values => {
        axios.post("https://api.trulylittlethings.com/login",
               {user:
                    {
               username:values.username,
               pwd:values.password,
           }  
            }
        ).then( (response)=> {
           if (response.data.statusCode!== 401){  
           cookies.set('refresh_token', response.data.refresh_token, { path: '/' })
           cookies.set('access_token', response.data.access_token, { path: '/' })
           window.location.href = '/'; }
          else
          {
           this.openNotification("Login Fail",response.data.message,<WarningOutlined style=  {{color:"red"}}/>);
          }
         
       
         })
         .catch(function (error) {
           console.log(error);
         });
      
       
           
       };
    
    render() {
  
          
       
    return (
       <div className="loginform">
              <Head>
        <title>TrulyLittleThings | Login</title>
      </Head>
    <PageIndicator>會員登入</PageIndicator><br/>
    <div style={{width:"90%" ,marginLeft: "auto", marginRight: "auto"}} >
           <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Email.' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password.' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                </Form.Item>
                <br/>
                    <a className="login-form-forgot" href="./forgotpassword.html">
                    Forgot password
                    </a>
                </Form>
                </div>
                </div>  
                                
    )
  }
}
export default login;