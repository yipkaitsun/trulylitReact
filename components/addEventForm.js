import React, { Component } from 'react';
import { Form, Input, Button, notification,Steps } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import AddImage from './addImage';
const { Step } = Steps;
const { TextArea } = Input;
const hints = ["<img style= width=100% src='./resources/.....image directory'/>","new line add <br/>"];
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
class AddEventForm extends Component {

  constructor(props) {
    super(props);
      this.state =
      {
          current: 0
      }
 
  } 

   
    onFinish = (item) => {
        axios.post("https://trulylittlethings.herokuapp.com/EventForm-api", { input:item,function:"add" } )
            .then((response) => {
                if (response.data.result) { openNotification("Success") }
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
            <Steps
                type="navigation"
                size="small"
                current={this.state.current}
                onChange={this.onChange}
                className="site-navigation-steps"
            >
                <Step
                    title="Upload Photo"

                />
                <Step
                    title="Edit Event"
                />
            </Steps>

            {this.state.current == 0 ?
                <AddImage src="eventphoto" ratio={1} />
                :
                <Form
                    {...layout}
                    name="Eventform"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your workshop name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Slogon"
                        name="slogon"
                        rules={[{ required: true, message: 'Please input your slogon!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Detail"
                        name="detail"
                        rules={[{ required: true, message: 'Please input your slogon!' }]}>

                        <TextArea style={{ width: '80%' }}
                            placeholder={"input HTML"}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                   <p>{hints[1]}</p>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please input your slogon!' }]}>

                        <TextArea style={{ width: '80%' }}
                            placeholder={"input HTML"}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                    <p>{hints[1]}</p>
                    <Form.Item>
                        <Form.List name="class" rules={[
                            {
                                validator: async (_, tags) => {
                                    if (!tags || tags.length < 1) {
                                        return Promise.reject(new Error('At least 1 class'));
                                    }
                                },
                            },
                        ]}>
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Class' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input placeholder={"class" + index} style={{ width: '80%' }} />

                                            </Form.Item>
                                            {fields.length > 0 ? (
                                                <MinusCircleOutlined
                                                    style={{ paddingLeft: "20px" }}
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}

                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <div style={{ textAlign: "Center" }}>  <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: '60%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add class
              </Button>
                                        </div>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item
                            label="Youtube link"
                            name="youtube"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="image"
                            name="reference"
                        >

                            <TextArea style={{ width: '80%' }}
                                placeholder={"input <img/> HTML"}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                        <p>{hints[0]}</p>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                     </Button>
                        </Form.Item>
                    </Form.Item>

                </Form>
            }
      </div>

    )
  }
}
export default AddEventForm;