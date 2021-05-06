import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from "axios";
import {PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const layout = {
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


const openNotification = (msg) => {
    const args = {
        message: msg,
        duration: 0,
    };
    notification.open(args);
};
class EditPageForm extends Component {

  constructor(props) {
    super(props);
    
  } 

   
    onFinish = (item) => {
        console.log(item);
        axios.post("https://trulylittlethings.herokuapp.com/loadPage-api", { input:item,id:this.props.id, function:"edit" } )
            .then((response) => {
                if (response.data.result) { openNotification("Success"); this.props.finish(); }
                else { openNotification("Fail")}
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
                        initialValue={this.props.banner}
                        label="Banner"
                        name="banner"
                >
                    <input style={{width:'100%'}}/>
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.content}
                        label="Content "
                        name="content"
                    >
                        <TextArea style={{ width: '100%' }}
                            placeholder={"input HTML"}
                            autoSize={{ minRows: 3, maxRows: 12 }}
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
export default EditPageForm;