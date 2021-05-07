import React, { Component } from 'react';
import {  Modal,Table, Tag,Spin} from 'antd';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Order from '../components/order';
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
            login:false,
            transaction:[],
            dataSource:[],
            order:0,
            detail:[{orderId:null}],
            visible:false,
            loading:true        
        }
        
        axios.post("https://api.trulylittlethings.com/auth",{token:cookies.get("access_token"),refresh:cookies.get("refresh_token")})
        .then( (response)=> {  
          this.setState({loading:false})
          const res_login =  response.data;
          if (res_login.statusCode===200){
            this.setState({login:true});
            if (res_login.msg==="refresh"){
             cookies.set('access_token', res_login.access_token, { path: '/' })
            }
            axios.post("https://api.trulylittlethings.com/transactionRecord-api",{access_token:cookies.get("access_token")})
            .then( (response) =>{  
           this.setState({transaction:response.data.transaction,dataSource:response.data.dataSource});
          })
        }
      })
    }
   
    showModal = (key) => {
      console.log(this.state.transaction);
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
     
    <PageIndicator>交易紀錄</PageIndicator><br/>

    {
    this.state.loading===true? 
    <div style={{textAlign:"center"}}>
    <Spin size="large" /> </div>:
    
    this.state.login?
   <Table className="tranansactionTable" columns={columns} dataSource={this.state.dataSource}  onRow={(record, rowIndex) => {
    return {
      onClick:()=>{this.showModal(record.key)},
        
    };
  }}/>:<p style={{textAlign:"center"}}>Please login to view the transaction record</p>}
   <Modal
          title={"Order #"+this.state.detail[0].orderId}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
     
      <Order detail= {this.state.detail} />
        </Modal>
                </div>  
                                
    )
  }
}
export default Transaction;