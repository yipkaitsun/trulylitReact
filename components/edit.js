import React, { Component } from 'react';
import { Form, Input, Button, notification, Collapse } from 'antd';
import Cookies from 'universal-cookie';
import PageIndicator from './pageIndicator';
import { UserOutlined, LockOutlined, WarningOutlined,CheckOutlined } from '@ant-design/icons';
const cookies = new Cookies();
const { Panel } = Collapse;
import axios from "axios";

class edit extends Component {
    constructor(props) {
        super(props);
        this.state={
            newpwd:"",
            validateStatus:{status:"success",help:""},
            loading:false,
        }
    }

    onFinish = values => {
        this.setState({loading:true});
        console.log( cookies.get("access_token"));
        axios.post("https://api.trulylittlethings.com/editpassword-api",
            {       accesstoken: cookies.get("access_token"),
                    oldpwd: values.oldpwd,
                    newpwd: values.newpwd,
                    confirmpwd: values.confirmpassword,
            }
        ).then( (response)=> {
            this.setState({loading:false});
            if (response.data.statusCode === 200) {
                notification.open({
                    message: "Reset Password Success",
                    description: response.data.message,
                    icon: <CheckOutlined style={{ color: "green" }} />,
                });
            }

            else {
                notification.open({
                    message: "Reset Password Fail",
                    description: response.data.message,
                    icon: <WarningOutlined style={{ color: "red" }} />,
                });
            }
        })
    }

    onFinish2 = values => {
        this.setState({loading:true});
        axios.post("https://api.trulylittlethings.com/editContact-api",
        
            {       accesstoken: cookies.get("access_token"),   
                    Fname: values.fname,
                    Lname: values.lname,
                    Contact: values.contact   
            }
        ).then( (response)=> {
            this.setState({loading:false})
            if (response.data.statusCode === 200) {
                notification.open({
                    message: "Edit Success",
                    description: response.data.message,
                    icon: <CheckOutlined style={{ color: "green" }} />,
                });
            }

            else {
                notification.open({
                    message: "Edit Fail",
                    description: response.data.message,
                    icon: <WarningOutlined style={{ color: "red" }} />,
                });
            }
        })
    }

    onChange=val=>{
        this.setState({newpwd:val},()=>{
        if (val===this.state.newpwd){
            this.setState({ validateStatus:{status:"success",help:""}})
        }
        else{
            this.setState({ validateStatus:{status:"error",help:"Please Enter the same password with previous"}})
        }
    })
    }

    
    render() {
        return (
            <div className="loginform">
                <PageIndicator>編輯個人資料</PageIndicator><br />
                <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }} >
                    <Collapse defaultActiveKey={['1']} >

                        <Panel header="重設密碼" key="1">
                            <Form
                                name="normal_login"
                                className="login-form"
                                onFinish={this.onFinish}
                            >


                            <Form.Item
                                    name="oldpwd"
                                    rules={[{ required: true, message: 'Please input your Password' }]}
                                >
                                    <Input validateStatus={this.state.validateStatus.status} help={this.state.validateStatus.help}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Old Password"
                                        onChange={this.onChange}
                                    />
                                </Form.Item>


                                <Form.Item
                                    name="newpwd"
                                    rules={[{ required: true, message: 'Please enter your new password' }]}
                                >
                                    <Input validateStatus={this.state.validateStatus.status} help={this.state.validateStatus.help}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="New Password"
                                        onChange={this.onChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirmpassword"
                                    rules={[{ required: true, message: 'Please confirm your new password' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Confirm New Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                    loading={this.state.loading}  
                                    type="primary" 
                                    htmlType="submit" 
                                    className="login-form-button">Submit</Button>
                                </Form.Item>
                            </Form>
                        </Panel>

                        <Panel header="編輯聯絡資料" key="2">

                            <Form
                                name="normal_login"
                                className="login-form"
                                onFinish={this.onFinish2}
                            >

                                <Form.Item
                                    name="fname"
                                    rules={[{ required: true, message: 'Please input your First Name!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
                                </Form.Item>

                                <Form.Item
                                    name="lname"
                                    rules={[{ required: true, message: 'Please input your Last Name!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
                                </Form.Item>

                                <Form.Item
                                    name="contact"
                                    rules={[{ required: true, message: 'Please input your contact!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone" />
                                </Form.Item>
                                <Form.Item>
                                    <Button 
                                    loading={this.state.loading} 
                                    type="primary" 
                                    htmlType="submit" 
                                    className="login-form-button">Submit</Button>
                                </Form.Item>
                            </Form>
                        </Panel>
                    </Collapse>
                   </div>
            </div>

        )
    }
}
export default edit;