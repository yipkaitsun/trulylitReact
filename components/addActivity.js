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
class AddActivity extends Component {

  constructor(props) {
    super(props);
      this.state =
      {
          current: 0,
          form: {
              name: "",
              descriptions: "",
              link: "",
          },
          image: "",
          display: ["block", "none", "none"],
          flag:false,

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
                link: item.link,
                
            },
            flag: true
        })
        openNotification("Success")
}
    onFinish = () => {

        if (this.state.flag == true) {
            axios.post("https://trulylittlethings.herokuapp.com/activity-api", { input: this.state.form, image: this.state.image, function: "add" })
                .then((response) => {
                    if (response.data.result) { openNotification("Success") }
                    else { openNotification("Fail") }
                })
        }
        else {
            openNotification("Fail") 
        }
   }

    onChange = current => {
        var tempdis = [];
        this.state.display.forEach((el, index) => {
            if (index == current) tempdis.push("block");
            else tempdis.push("none");
        })
        this.setState({ display: tempdis,current:current });
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
                    title="Add Activity"
                />

                <Step
                    title="Select Image"
                />
            </Steps>
            <div>
                <div style={{ display: this.state.display[0]}}>
                    <AddImage src="eventphoto" ratio={1}/>
                </div>
                <div style={{ display: this.state.display[1] }}>
                    <br/>
                <Form
                    {...layout}
                        name="ActicityForm"
                        onFinish={this.submitForm}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your activity name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="descriptions"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Link"
                        name="link"
                        rules={[{ required: true, message: 'Please input link!' }]}
                    >
                            <Input />
                   
                    </Form.Item>
                        <p style={{ textAlign: "left" }}>hints:   https://www.trulylittlethings.com/workshop.html?id= </p>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                     </Button>
                    </Form.Item>


                </Form>
                </div>
                <div style={{ display: this.state.display[2] }}>
                    <br/>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={this.onFinish}> Submit</Button></div>
                    <SelectImage type='radio' defaultValue={[]} dir="eventphoto" selectImage={this.selectImage} />
                    </div>
            </div>
           
            
            
        
            
           
      </div>

    )
  }
}
export default AddActivity;