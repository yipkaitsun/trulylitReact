import Head from 'next/head';
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import axios from 'axios'
import Cookies from 'universal-cookie';
import PageIndicator from '../components/pageIndicator';
import { UserOutlined,CheckOutlined,WarningOutlined } from '@ant-design/icons';


const cookies = new Cookies();

class forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
        }

    }
    openNotification = (title, msg, icon) => {
        notification.open({
            message: title,
            description: msg,
            icon: icon,

        });
    };
    onFinish = values => {
        axios.post("https://api.trulylittlethings.com/forgotpw-api",
            {
                email: values.email,
            }

        ).then((response) => {
            if (response.data.statusCode !== 502) {
                this.openNotification("Reset Success", response.data.message, <CheckOutlined style={{ color: "green" }} />);
            }
            else {
                this.openNotification("Reset Fail", response.data.message, <WarningOutlined style={{ color: "red" }} />);
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
        <title>TrulyLittleThings | Forgot Password</title>
        </Head>
                <PageIndicator>忘記密碼</PageIndicator><br />
                <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }} >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Reset
                    </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>

        )
    }
}
export default forgotpassword;