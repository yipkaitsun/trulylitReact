import Head from 'next/head';
import React, { Component } from 'react';
import { Form, Input, Button, notification,Result } from 'antd';
import Cookies from 'universal-cookie';
import PageIndicator from '../components/pageIndicator';
import { UserOutlined, LockOutlined, WarningOutlined } from '@ant-design/icons';
const cookies = new Cookies();
import axios from "axios";

class register extends Component {
    constructor(props) {
        super(props);
        this.state={loading:false,finish:false};

    }

    onFinish = values => {
        this.setState({loading:true});
        axios.post("https://api.trulylittlethings.com/create-user",
            {
                user: {
                    pwd: values.pwd,
                    Fname: values.fname,
                    Lname: values.lname,
                    email: values.email,
                    role: values.role,
                    contact: values.contact,
                }
            }
        ).then( response=> {
            if (response.data.statusCode === 200) {
               this.setState({loading:false,finish:true});
            }
            else {
                this.setState({loading:false});
                notification.open({
                    message: "Register Fail",
                    description: "Registered Username or Email",
                    icon: <WarningOutlined style={{ color: "red" }} />,

                });

            }

        })
    }

    render() {

        return (

            <div className="loginform">
                  <Head>
        <title>TrulyLittleThings | Register</title>
      </Head>
                <PageIndicator>會員登記</PageIndicator><br />
                <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }} >
                {this.state.finish===false?
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email.' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="pwd"
                            rules={[{ required: true, message: 'Please input your Password.' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <h4>聯絡資料/Contact Information</h4>

                        <Form.Item
                            name="fname"
                            rules={[{ required: true, message: 'Please input your First Name.' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
                        </Form.Item>


                        <Form.Item
                            name="lname"
                            rules={[{ required: true, message: 'Please input your Last Name.' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
                        </Form.Item>



                        <Form.Item
                            name="contact"
                            rules={[{ required: true, message: 'Please input your Phone Number.' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone" />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" 
                            htmlType="submit" 
                            loading={this.state.loading} 
                            className="login-form-button">
                                Register
                    </Button>
                        </Form.Item>
                        <br />
                        
                    </Form>: 
                    <Result
                        status="success"
                        title="Please check your email to confirm your registration."
                        subTitle="In order to complete the subscription process, simply check your inbox and click on the link in the email we have just sent you. If it is not there, please check your junk mail folder and if it is in the junk mail folder, remember to mark the email as 'not junk'."

                     />}
                    </div>
            </div>

        )
    }
}
export default register;