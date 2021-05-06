import React, { Component } from 'react';
import PageIndicator from '../components/pageIndicator';
import Head from 'next/head';
class news extends Component {
   
  render() {
    return (
        
        <div className="price-page" style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
            <Head> 
        <title>TrulyLittleThings | News</title>
            <script src="https://apps.elfsight.com/p/platform.js" defer></script>
            </Head>
            <PageIndicator>最新消息</PageIndicator><br/>
            <div className="elfsight-app-0d19fb65-a5c8-46c6-9dd1-4e268965551c"></div>
       </div>
    )
  }
}
export default news;