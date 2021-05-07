import React, { Component } from 'react';
import { Form, Input, Button, notification,Steps, } from 'antd';
import axios from "axios";
import AddImage from './addImage';
import SelectImage from './selectImage';
const { Step } = Steps;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 0},
    wrapperCol: { span: 0 },
};

const formItemLayout = {
    labelCol: {
        style: { textAlign: "left" },
        xs: { span: 6 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 0, offset: 0 },
        sm: { span: 0, offset: 0 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 0, offset: 6 },
        sm: { span: 0, offset: 6 },
    },
};
const openNotification = (msg) => {
    const args = {
        message: msg,
        duration: 0,
    };
    notification.open(args);
};
class AddPrice extends Component {

  constructor(props) {
    super(props);
  } 

  
    submitForm = (item) => {
            axios.post("https://trulylittlethings.herokuapp.com/price-api", {
                input: {
                    name: item.name,
                    price: item.price,
                    info: item.info,

                }, function: "add" })
                .then((response) => {
                    if (response.data.result) { openNotification("Success") }
                    else { openNotification("Fail") }
                })
 
}
  


    render() {
      
    return (
        <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
            
            <div>
              
               
                <Form
                    {...layout}
                        name="PriceForm"
                        onFinish={this.submitForm}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your package name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                            rules={[{ required: true, message: 'Please input package price!' }]}
                    >
                            <TextArea style={{ width: '100%' }}
                                placeholder={"input HTML"}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                    </Form.Item>

                    <Form.Item
                        label="Info"
                        name="info"
                            rules={[{ required: true, message: 'Please input package info!' }]}
                    >
                            <TextArea style={{ width: '100%' }}
                                placeholder={"input HTML"}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                   
                    </Form.Item>
                      
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                     </Button>
                    </Form.Item>

                </Form>
            
            </div>
           
      </div>

    )
  }
}
export default AddPrice;