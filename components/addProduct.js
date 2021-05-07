import React, { Component } from 'react';
import { Upload, Collapse, Form, Input, Button, InputNumber, Steps, notification  } from 'antd';
import axios from "axios";
import { LoadingOutlined, PlusOutlined,MinusCircleOutlined,SendOutlined} from '@ant-design/icons';
import AddImage from './addImage';
import SelectImage from './selectImage';
import InputProduct from './inputProduct';
const { Step } = Steps;
const openNotification = () => {
    const args = {
        message: 'Success',
        description:
            'input Success',
        duration: 0,
    };
    notification.open(args);
};
class AddProduct extends Component {

  constructor(props) {
    super(props);

      this.state = {
    flag:false,
    selectImage:[],
    detailImage:[],
    input:[],
    result:false,
    loading:false,
    stepcur:["block","none","none","none"],
    current: 0,
          step: [<AddImage src="productphoto" ratio={1}/>,<InputProduct onFinish={this.onInputFinish}/>,<SelectImage type='radio'  dir="productphoto" defaultValue={[]} selectImage={this.selectImage}/>,<SelectImage type='checkbox' dir="productphoto"  defaultValue={[]} selectImage={this.selectDetailImage}/>]
    }
  } 
  onChange = current => {
    this.setState({ current });
    var tempstepcur=[];
    for(var i=0;i<this.state.stepcur.length;i++){
       if (i==current){
        tempstepcur[i]="block"
       }
       else{
        tempstepcur[i]="none"
    }
    this.setState({stepcur:tempstepcur})
    }
  };

   selectImage = (item) => {
    console.log(item);
       this.setState({selectImage: item})
   }

     selectDetailImage = (item) => {
      console.log(item);
       this.setState({detailImage: item})
   }

    onInputFinish = (item) => {
        openNotification();
       this.setState({input: item,flag:true})
   }
    onSubmit = () => {
        if (this.state.flag == true) {
            this.setState({ loading: true });
            axios.post("https://trulylittlethings.herokuapp.com/addProduct-api", { input: this.state.input, selectImage: this.state.selectImage, detailImage: this.state.detailImage })
                .then((response) => {
                    this.setState({ result: response.data.result, loading: false })
                })
        }
        else {
            const args = {
                message: 'Fail',
                description:
                    'input Fail',
                duration: 0,
            };
            notification.open(args);
        }
   }

  render() {
    return (
      <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
      {this.state.current==3?<div style={{textAlign: 'right'}}> <Button loading={this.state.loading} onClick={this.onSubmit} type="primary" type="dashed" icon={<SendOutlined />} danger size={"default"} >Sumbit</Button></div>:null}
        <Steps
          type="navigation"
          size="small"
          current={this.state.current}
          onChange={this.onChange}
          className="site-navigation-steps"
        >
          <Step
            title="Upload Photo"
            status="process"
          />
          <Step
            title="Input Detail"
            status="process"
          />
          <Step
            title="Thumbnails"
            status="process"
          />
           <Step
            title="Detail Image"
            status="process"
          />
        </Steps>
        <br/>
       {this.state.step.map((arr, index, { length }) => (<div style={{display:this.state.stepcur[index]}}>{arr}</div>))}
        
   
      </div>

    )
  }
}
export default AddProduct;