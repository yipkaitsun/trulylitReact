import React, { Component } from 'react';
import {  Form,Input,Button, Select } from 'antd';
import axios from "axios";
import { LoadingOutlined, PlusOutlined,MinusCircleOutlined,SendOutlined} from '@ant-design/icons';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

class Subtype extends Component {

  constructor(props) {
    super(props);
    this.loadData();
    this.state = {
     selectedItems: [],
     dataSource:[{name:null,id:null}]
         } 
        
  }
    handleChange = selectedItems => {
    this.setState({ selectedItems });
  };

   onFinish = values => {
    console.log(values);
    axios.post("https://trulylittlethings.herokuapp.com/addSubtype-api",{values:values}
    ).then((response) => {
    this.setState({dataSource:response.data.product})
     
     })
  };
  loadData() {
      axios.post("https://trulylittlethings.herokuapp.com/loadAllProduct-api", { function: "loadAll"}
    ).then((response) => {
    this.setState({dataSource:response.data.product})
     
     })
  } 	

  render() {
    const { selectedItems } = this.state;
    const filteredOptions = this.state.dataSource.filter(o => !selectedItems.includes(o));
    return (
      <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
          <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={this.onFinish}>
        <Form.List
        name="subtype"
        rules={[
          {
            validator: async (_, subtypes) => {
              if ( subtypes.length !== this.state.selectedItems.length) {
                return Promise.reject(new Error('Match '+this.state.selectedItems.length+' specifications'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Specifications' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input specifications's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Specifications name" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
             
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item name="subproduct" label="Specifications">
      <Select
        mode="multiple"
        placeholder="Specifications"
        value={selectedItems}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {filteredOptions.map(item => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
	</div>
      )
    }
}
export default Subtype;