import React, { Component } from 'react';
import { Form, Input, Button, notification,Select } from 'antd';
import axios from "axios";

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
class EditEventForm extends Component {

  constructor(props) {
    super(props);     
  } 

   
    onFinish = (item) => {
      axios.post("https://trulylittlethings.herokuapp.com/loadRSVP-api", { input:item,id:this.props.id, function:"edit" } )
            .then((response) => {
                if (response.data.result) { openNotification("Success");this.props.finish() }
                else { openNotification("Fail") }
            })
     
   }


    onChange = current => {
        console.log('onChange:', current);
        this.setState({ current });
    };

  render() {
    return (
        <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
            


                <Form
                    {...layout}
                    name="Eventform"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        initialValue={this.props.status}
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please input your Status' }]}
                    >
                        <Select placeholder="Please select a status">
                            <Option value="pending">Pending</Option>
                            <Option value="processing">Processing</Option>
                            <Option value="completed">Completed</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.remark}
                        label="Remarks"
                        name="remark"
                    >
                        <Input />
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
export default EditEventForm;