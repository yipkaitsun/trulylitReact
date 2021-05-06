import React, { Component } from 'react';
import { Form, Input, Button, notification, Steps } from 'antd';
import axios from "axios";
import {PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import AddImage from './addImage';
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
class EditEventForm extends Component {

  constructor(props) {
    super(props);
      this.state = {
          event: {
              class: "[]"
          },
          current:0,
      }
     
  } 

   
    onFinish = (item) => {
        axios.post("https://trulylittlethings.herokuapp.com/EventForm-api", { input:item,id:this.props.id, function:"edit" } )
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
                <AddImage src="eventphoto"/>
                :
                <Form
                    {...layout}
                    name="Eventform"
                    onFinish={this.onFinish}
                    initialValues={{ class: this.props.class }}
                >
                    <Form.Item
                        initialValue={this.props.name}
                        label="Name (Event Tittle)"
                        name="name"
                        rules={[{ required: true, message: 'Please input your workshop name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.slogon}
                        label="Slogon (Event Subtittle)"
                        name="slogon"
                        rules={[{ required: true, message: 'Please input your slogon!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.detail}
                        label="Detail (Event Description)"
                        name="detail"
                        rules={[{ required: true, message: 'Please input your detail!' }]}>

                        <TextArea style={{ width: '80%' }}
                            placeholder={"input HTML"}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.content}
                        label="Content (Event detail)"
                        name="content"
                        rules={[{ required: true, message: 'Please input your content!' }]}>

                        <TextArea style={{ width: '80%' }}
                            placeholder={"input HTML"}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>

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
                                            label={index === 0 ? 'Class (Event SessionName)' : ''}
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
                            initialValue={this.props.youtube}
                            label="Youtube link"
                            name="youtube"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            initialValue={this.props.image}
                            label="image"
                            name="reference"
                        >

                            <TextArea style={{ width: '80%' }}
                                placeholder={"input <img/> HTML"}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>

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
export default EditEventForm;