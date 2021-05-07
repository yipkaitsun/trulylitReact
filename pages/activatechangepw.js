import Head from 'next/head';
import React, { Component } from 'react';
import {Spin} from 'antd';
import axios from 'axios';


class activatechangepw  extends Component {


      componentDidMount(){
        this.loadData();
     }
       loadData() {
         
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id=urlParams.toString().substring(3, ) ;
        axios.post("https://api.trulylittlethings.com/activechangepw-api",{id:id}
      ).then(function (response) {
        if (response.data.statusCode===0)
          window.location.href = '/login.html'; 
        })
      }
      
    

  render() {
    return (
        
        <div className="recreation-page" style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
        <Head><title>TrulyLittleThings | activatechangepw</title></Head>
        <Spin size="large" />

                  
        </div>
    )
  }
}
export default activatechangepw;