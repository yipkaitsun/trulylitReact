import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Table } from 'antd';
const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];
class Order extends Component {

    constructor(props){
      
        super(props);
        this.state={
            transaction:[],
            detail:{},
            subtotal:0,
        }

        console.log(this.props.detail[0]);
    }

    render() {
      
        const dataSource=[];
        var subtotal=0;
        var address={
            flat: this.props.detail[0].flat,
            block:this.props.detail[0].block,
            floor:this.props.detail[0].floor,
            building:this.props.detail[0].building,
            street:this.props.detail[0].street,
            
        };
        var express={
            company:this.props.detail[0].express,
            pickpt:this.props.detail[0].pickpt,
        }

        try{
      
        this.props.detail.map((arr,index,{length})=>{
     
            
                dataSource.push(
                    {key:index, 
                    product:arr.name +" X "+arr.quantity, 
                    total: arr.Subtotal,
                   }) 
               

            subtotal+=arr.Subtotal;
     })
             dataSource.push(
                {key:"subtotal", 
                product:<strong>Subtotal:</strong>, 
                total:<strong>{subtotal}</strong>,
               });
               dataSource.push(
                {key:"method", 
                product:<strong>Payment Method:</strong>, 
                total: <strong>{this.props.detail[0].payment}</strong>,
               });

            
               
    }
     catch(err){

     }
      

    return (
        <div>
        <h2>Order Detail</h2>
   <p>Order # <strong>{this.props.detail[0].orderId}</strong> was placed on <strong>{moment(this.props.detail[0].date).tz('Asia/Hong_Kong').format('LL')}</strong> and is currently <strong>{this.props.detail[0].status}</strong></p>
   <Table dataSource={dataSource} columns={columns} />
       <hr/>
       {this.props.detail[0].shipping!==null ?
       <div>
   <h2>Shipping Detail</h2>
   <p><strong>Shipping Method:</strong>   {this.props.detail[0].shipping}</p>
   {this.props.detail[0].express!==""? 
   <p><strong>Express Company:</strong> {this.props.detail[0].express}</p>:null}
    {this.props.detail[0].pickpt!==""? 
   <p><strong>Pickup Point:</strong> {this.props.detail[0].pickpt}</p>:null}
   
    {address.flat!==""||address.floor!==""||address.block!==""||address.building!==""||address.street!==""? <p><strong>Address:</strong><br/></p>:null }
 
   {address.flat!==""? "Flat "+address.flat+",":null}  {address.floor!==""? address.floor+"/F,":null}   {address.block!==""? "Block "+address.block+",":null}
   <br/>  
   {address.building!==""? address.building+",":null}<br/>
   {address.street!==""? address.street:null} 
   </div>
   :null}
     
     </div>
        )
    }
}
export default Order;