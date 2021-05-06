import React, { Component } from 'react';
import { Form, Input, Button, notification, Steps } from 'antd';
import axios from "axios";
import AddImage from './addImage';
import SelectImage from './selectImage';
const { Step } = Steps;
const { TextArea } = Input;
const hints="Copy ./workshop.html when event end"
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
          display: ["block","none","none"],
          current: 0,
          form: {
              name: this.props.name,
              descriptions: this.props.description,
              link: this.props.link
          },
          image: this.props.image,
   
      }
     
  } 
    selectImage = (item) => {
        this.setState({ image: item })
    }

    submitForm = (item) => {
        this.setState({
            form: {
                name: item.name,
                descriptions: item.descriptions,
                link: item.link
            },

        })
    }

    onFinish = () => {
        axios.post("https://trulylittlethings.herokuapp.com/activity-api", { input: this.state.form, image: this.state.image, id: this.props.id, function: "edit" })
            .then((response) => {
                if (response.data.result) { openNotification("Success") }
                else { openNotification("Fail") }
            })
   }



    onChange = current => {
        var tempdis = [];
        this.state.display.forEach((el, index) => {
            if (index == current) tempdis.push("block");
            else tempdis.push("none");
        })
        this.setState({ display: tempdis, current: current });
    };

    render() {


    return (
        <div className="price-page" style={{ marginLeft: "auto", marginRight: "auto" }}>
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
                    title="Edit Activity" 
                />
                <Step
                    title="Select Photo" 
                />
            </Steps>

           
            <div style={{ display: this.state.display[0]}}>
                <AddImage src="eventphoto" />
            </div> 
            <div style={{ display: this.state.display[1] }}>
                <br/>
                <Form
                    {...layout}
                    name="Eventform"
                    onFinish={this.submitForm}
                    initialValues={{ class: this.props.class }}
                >
                    <Form.Item
                        initialValue={ this.props.name}
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your activity name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.description}
                        label="Description"
                        name="descriptions"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        initialValue={this.props.link}
                        label="Link"
                        name="link"
                        rules={[{ required: true, message: 'Please input link!' }]}
                    >
                        <Input />
                       
                    </Form.Item>
                    <p>{hints}</p>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                     </Button>
                        </Form.Item>
                </Form>
                   </div> 
            <div style={{ display: this.state.display[2] }}>
                <br />
                <div style={{ textAlign: "right" }}>
                    <Button onClick={this.onFinish}> Submit</Button></div>
                <SelectImage type='radio' defaultValue={[this.props.image]} dir="eventphoto" selectImage={this.selectImage} />
            </div>
   
      </div>

    )
  }
}
export default EditEventForm;