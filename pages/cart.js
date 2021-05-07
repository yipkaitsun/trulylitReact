import Head from 'next/head';
import React, { Component } from 'react';
import { Tabs } from 'antd';
import Cart from '../components/cart';
import Transaction from '../components/transaction';
import Cookies from 'universal-cookie';

const { TabPane } = Tabs;

class profile extends Component {

    constructor(props){
      
        super(props);
   
    }

    render() {

    return (
        <div style={{paddingLeft:"2.5%",paddingRight:"2.5%"}}>
        <Head>
        <title>TrulyLittleThings | Cart</title>
        </Head>
        <Tabs defaultActiveKey="1" >
        <TabPane tab="購物車" key="1">
            <Cart/>
        </TabPane>
        <TabPane tab="交易紀錄" key="3">
         <Transaction/>
        </TabPane>
      </Tabs>
      <br/><br/>
      </div>
        )
    }
}
export default profile;