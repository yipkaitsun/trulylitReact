import Head from 'next/head';
import React, { Component } from 'react';
import {Spin} from 'antd';
import axios from 'axios';


class activate  extends Component {


      componentDidMount(){
        this.loadData();
     }
       loadData() {
         
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id=urlParams.toString().substring(3, ) ;
        axios.post("https://api.trulylittlethings.com/activate-api",{id:id}
      ).then(function (response) {
          window.location.href = '/login.html'; 
        })
      }
      
    

  render() {
    return (
        
        <div className="recreation-page" style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
        <Head>
        <title>TrulyLittleThings | Activate</title>
        </Head>
        <Spin size="large" />

                  
        </div>
    )
  }
}
export default activate;