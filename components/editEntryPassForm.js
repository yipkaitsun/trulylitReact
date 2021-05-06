import React, { Component } from 'react';
import { Form, Input, Button, notification, InputNumber, Radio, Select, Switch } from 'antd';
import axios from "axios";



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

const openNotification = (msg) => {
    const args = {
        message: msg,
        duration: 0,
    };
    notification.open(args);
};

class EditEntryPassForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);

        this.loadData();
        this.state = {
            hoursflag: false,
            dataSource: [],
            initHours: this.props.hoursNum
          
        }
    }
    onReset = () => {
        this.formRef.current.resetFields(['hours']);
    };

    setInitHours = () => {
        this.formRef.current.setFieldsValue({ hours: this.props.hoursNum });
    };

    loadData() {
        axios.post("https://trulylittlethings.herokuapp.com/loadAllProduct-api", { function: "loadAll" }
        ).then((response) => {
            this.setState({ dataSource: response.data.product })

        })
    } 
    submitForm = (item) => {
        axios.post("https://trulylittlethings.herokuapp.com/entryPass-api", {
            input: item, function: "edit",id:this.props.id
        })
            .then((response) => {
                if (response.data.result) { openNotification("Success");this.props.finish() }
                else { openNotification("Fail") }
            })
        
    }

    passtypeChange = (e) => {
        if (e.target.value == 'monthly')
        {
            this.setState({ initHours: undefined, hoursflag: true }, () => { this.onReset() })
          
        }else 
            this.setState({ hoursflag: false }, () => { this.setInitHours()})  
        }
  

    render() {
      
    return (
        <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
            
            <div>
              
               
                <Form ref={this.formRef}
                    {...formItemLayout}
                        name="PriceForm"
                        onFinish={this.submitForm}
                >
                   

                    <Form.Item initialValue={this.props.passtype} name="radio-group" name="passtype" label="Pass Type"

                        rules={[{ required: true}]} >
                        <Radio.Group onChange={this.passtypeChange}>
                            <Radio value="monthly">Monthly Pass</Radio>
                            <Radio value="hours">Hours Pass</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Hours" name="hours" initialValue={this.state.initHours} rules={[{ required: !this.state.hoursflag }]} >         
                            <InputNumber min={1} disabled={this.state.hoursflag}  />
                    </Form.Item>

                    <Form.Item name="product" initialValue={this.props.productId} label="Product" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Select a option and change input text above"
                        >
                            {this.state.dataSource.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item initialValue={this.props.launch} name="launch" label="Launch" rules={[{ required: true, message: 'Please input your package name!' }]}>
                        <Switch defaultChecked={this.props.launch} />
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
export default EditEntryPassForm;