import Head from 'next/head';
import React, { Component } from 'react';
import {  Input,Button,Modal,Table, Tag,Spin,Form} from 'antd';
import moment from 'moment-timezone';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Order from '../components/Order';
import PageIndicator from '../components/pageIndicator';
const cookies = new Cookies();
const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: '33%',
  
  },
     {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: '33%',
  
  },

  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',

  },

];
class Transaction extends Component {

    constructor(props){
        super(props);
   
        this.state={
            login:true,
            transaction:[],
            dataSource:[],
            order:0,
            detail:{},
            visible:false,
            loading:false,
            orderid:"",
            phone:""
        }
    }
    submitform=(value)=>{
      axios.post("https://api.trulylittlethings.com/admin-transactionRecord-api",{token:cookies.get("access_token"),phoneNo:value})
      .then( (response) =>{
        console.log(response.data);
        if (response.data.statusCode===0){  
        this.setState({transaction:response.data.item,login:true});
        var temp=[];
        response.data.item.map((arr,index,{length})=>{
            var date = moment(arr.date).tz('Asia/Hong_Kong').format('LL');
           
            temp.push(
                {key:index, 
                date:date, 
                id: "#"+arr.id,
                status:  <Tag  color={arr.status}>
           {arr.status}
              </Tag>,
            });
              
    
     });
     this.setState({dataSource:temp});
    }
    else{
      this.setState({login:false})
        }
      })
    }
   
    showModal = (key) => {
         this.setState({
                order:key,  
                detail:this.state.transaction[key],
                visible: true,
            });
    
    
    }
    
      handleOk = e => {
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };

 
    render() {
   
      
    return (
        <div className="price-page" style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
       <Head>
        <title>TrulyLittleThings | Ordercheck</title>
      </Head>
    <PageIndicator>交易紀錄</PageIndicator><br/>

    {
    
    this.state.loading===true? 
    
    <div style={{textAlign:"center"}}>
    <Spin size="large" /> </div>:
    
    this.state.login?
   <div>
      <Form
    onFinish={this.submitform}
  >
    <Form.Item
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please input the phone Number!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

   <Table className="tranansactionTable" columns={columns} dataSource={this.state.dataSource}  onRow={(record, rowIndex) => {
    return {
      onClick:()=>{this.showModal(record.key)},
        
    };
  }}/>
  </div>:<p style={{textAlign:"center"}}>Please login to view the transaction record</p>}
   <Modal
          title={"Order #"+this.state.detail.id}
          visible={this.state.visible}T
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
     
      <Order detail= {JSON.stringify(this.state.detail)} />
        </Modal>
                </div>  
                                
    )
  }
}
export default Transaction;