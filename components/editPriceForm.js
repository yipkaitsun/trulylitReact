import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from "axios";
import {PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const layout = {
    labelCol: { span: 0},
    wrapperCol: { span: 0 },
};


const openNotification = (msg) => {
    const args = {
        message: msg,
        duration: 0,
    };
    notification.open(args);
};
class EditPriceForm extends Component {

  constructor(props) {
    super(props);
    
  } 

   
    onFinish = (item) => {
        axios.post("https://trulylittlethings.herokuapp.com/price-api", { input:item,id:this.props.id, function:"edit" } )
            .then((response) => {
                if (response.data.result) { openNotification("Success"); this.props.finish(); }
                else { openNotification("Fail") }
            })
   }


 

  render() {
    return (
        <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
         
                <Form
                    {...layout}
                    name="Eventform"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        initialValue={this.props.name}
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your package name!' }]}
                >
                        <input/>
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.price}
                        label="Price "
                        name="price"
                    rules={[{ required: true, message: 'Please input your package price!' }]}
                    >
                        <TextArea style={{ width: '100%' }}
                            placeholder={"input HTML"}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.info}
                        label="Additional Information"
                        name="info"
                    rules={[{ required: true, message: 'Please input your package information!' }]}>

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

    )
  }
}
export default EditPriceForm;