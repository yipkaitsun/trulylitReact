import React, { Component } from 'react';
import PageIndicator from './pageIndicator';
import { QRCode } from "react-qr-svg";
import Cookies from 'universal-cookie';
import axios from 'axios';
import {Spin } from 'antd';
const cookies = new Cookies();

class Qrcode extends Component {

    constructor(props){
      
        super(props);
        this.state={
            login: false,
            username:"",
            loading:true
        }
        axios.post("https://api.trulylittlethings.com/qrcode",
        {access_token:cookies.get("access_token")}
        ).then(function (response) {
            this.setState({loading:false});
            this.setState({username:response.data.username});
        
  }.bind(this));
    }


    render() {

    return (
        <div style={{width:"80%",marginLeft:"auto",marginRight:"auto"}} className="login-page">
       
       
       <PageIndicator>QR CODE</PageIndicator>
    {this.state.loading===true?
    <div style={{textAlign:"center"}}>
    <Spin size="large" /> </div>:

        this.state.username!=="" ?
        <div>
                <div style={{textAlign:"center",paddingTop:20}}>
                <QRCode 
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 256 }}
                value={this.state.username}
            />
                </div>   </div>
        : <p>Please login to view the qrcode</p>
        
        }
        </div>
    )}
  
  }

export default Qrcode;