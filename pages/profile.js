import Head from 'next/head';
import React, { Component } from 'react';
import { Tabs } from 'antd';
import Qrcode from '../components/qrcode';
import Edit from '../components/edit';
import Entry from '../components/entry';
const { TabPane } = Tabs;
class profile extends Component {

    constructor(props){
      
        super(props);
   
    }

    render() {

    return (
        <div style={{paddingLeft:"2.5%",paddingRight:"2.5%"}}>
              <Head>
        <title>TrulyLittleThings | Profile</title>
      </Head>
    <Tabs defaultActiveKey="1" >
    <TabPane tab="QrCode" key="1">
    <Qrcode/>
    </TabPane>
    <TabPane tab="Edit Profile" key="2">
    <Edit/>
    </TabPane>

    <TabPane tab="Entry Record" key="3">
    <Entry/>
    </TabPane>
   
   
  </Tabs>
         
      
      <br/><br/>
      </div>
        )
    }
}
export default profile;