import React, { Component } from 'react';
import axios from "axios";
import { LoadingOutlined, PlusOutlined,MinusCircleOutlined} from '@ant-design/icons';
import {Form,Input,Button, InputNumber, Switch,Divider,Transfer,Select, } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
  style:{textAlign:"left"},
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 0 ,offset: 0 },
    sm: { span: 0 ,offset: 0 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 0, offset: 6},
    sm: { span: 0, offset: 6 },
  },
};




class InputProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category:[],
      targetCategory:[],
      discount:[],
      discountId:0,
    }
    this.loadCategory();
  }
  onChange = (newTargetKeys, direction, moveKeys) => {
  this.setState({targetCategory:newTargetKeys})
  };

  onFinish=value=>{

   this.props.onFinish(value);
  }
 

   loadCategory = () => {
     axios.post("https://trulylittlethings.herokuapp.com/loadProductTransfer-api")
        .then( (response) =>{  
        var tempdiscount=[];    
        for (var i=0;i<response.data.discountlist.length;i++){
        tempdiscount.push( 
        <Option value={response.data.discountlist[i].id}>{response.data.discountlist[i].title}</Option>
        )
            }
            this.setState({category:response.data.categoryList,discount:tempdiscount,defaultDiscount:response.data.discountlist[0].id})
        })
    }
  render() {
  
    return (
     
        <Form  name="product-form" onFinish={this.onFinish}>
        <Form.Item {...formItemLayout} name="name" label="Product Name" rules={[{ required: true }]}>
              <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="price" label="Price" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
           <Form.Item {...formItemLayout} name="vendor" label="Vendor" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
          <Form.Item  {...formItemLayout} label="Stock:"  rules={[{ required:true, type: 'number', min: 0, max: 999 }]} name="stock">     
              <InputNumber style={{width:"100%"}} />
        </Form.Item>
          <Form.Item name="visible" initialValue={true}  {...formItemLayout} rules={[{ required: true }]} label="Show in Shop" valuePropName="checked" >
        <Switch defaultChecked/>
      </Form.Item>
         <Form.Item name="market_item"  initialValue={true} {...formItemLayout}  rules={[{ required: true }]} label="Launch" valuePropName="checked">
        <Switch defaultChecked/>
      </Form.Item>
       <Form.Item name="discount" label="Discount" rules={[{ required: true }]}> 
      <Select value={this.state.discountId} style={{ width: 120 }} onChange={this.setDiscount} >
        {this.state.discount.map((arr, index, { length }) => (arr))}
        
        </Select>
        </Form.Item>
              <Form.Item >
           <Divider />
           <Form.List name="tag" rules={[
          {
            validator: async (_, tags) => {
              if (!tags || tags.length < 1) {
                return Promise.reject(new Error('At least 1 tags'));
              }
            },
          },
        ]}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Tag' : ''}
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
                  <Input placeholder={"tag "+index} style={{ width: '80%' }} />
                  
                </Form.Item>
                     {fields.length > 0 ? (
                  <MinusCircleOutlined
                  style={{paddingLeft:"20px"}}
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
                Add tag
              </Button>
             
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      
           <Divider />
           <Form.List name="information"  
           rules={[
          {
            validator: async (_, infos) => {
              if (!infos || infos.length < 1) {
                return Promise.reject(new Error('At least 1 Description'));
              }
            },
          },
        ]}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Description' : ''}
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
                 <TextArea style={{ width: '80%' }}
                 placeholder={"Information "+index}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
                </Form.Item>
                     {fields.length > 0 ? (
                  <MinusCircleOutlined
                  style={{paddingLeft:"20px"}}
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
                Add Description
              </Button>
             
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      
           <Divider />
              <Form.Item  {...formItemLayout} name="Category" label="Catecory" rules={[{ required: true }]}> 
         <Transfer
        dataSource={this.state.category}
        targetKeys={this.state.targetCategory}
        onChange={this.onChange}
        render={item => item.title}
        oneWay={true}
        pagination
      />
      </Form.Item>
      <Divider/>
       
        <Button type="primary" htmlType="submit">
          Confirm
        </Button>
      </Form.Item>
        </Form>
    )
  }
}
export default InputProduct;