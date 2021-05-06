import '../styles/globals.css'
import React ,{useState }from 'react';
import Head from "next/head";
import Header from '../components/header';
import {Affix} from 'antd';
import Header_logout from '../components/header-logout';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Marquee from "react-fast-marquee";
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();


  function MyApp ({ Component, pageProps }) {
    
    const [login, setLogin] = useState(false);
    var loadauth=false;

    if (loadauth===false){
      axios.post("https://api.trulylittlethings.com/auth",{token:cookies.get("access_token"),refresh:cookies.get("refresh_token")})
      .then( (response)=> {  
        loadauth=true;
     if (response.data.statusCode===200){
      setLogin(true);

      if (response.data.msg==="refresh"){
       cookies.set('access_token', response.data.access_token, { path: '/' })
      }
    }
    else {
     setLogin(false);
   }
      });

    }
 
    return (
      
      <div>
        <Head>
        <meta name='viewport' 
     content='width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0' ></meta>
        </Head>
      {login ?
      
      <div>
      <Affix offsetTop={0} ><Header/></Affix>
      <div
      style={{
       overflowX:"hidden",
        backgroundColor:"#ffffbf"
      }}
    >


<Marquee style={{whiteSpace:"pre",fontSize:"18px",overflow:"hidden"}}><div style={{display:"inline"}}>📢🤩 入場優惠</div><div style={{color:"red",display:"inline"}}>八五折 ❗❗</div></Marquee>
    </div>
      <Component {...pageProps} />
    </div>
    
    :<div>
    <Affix offsetTop={0} >
    <Header_logout/></Affix>  
  
    <div
      style={{
       overflowX:"hidden",
        backgroundColor:"#ffffbf"
      }}
    >
    {/*
<Marquee style={{whiteSpace:"pre",fontSize:"18px",overflow:"hidden"}}><div style={{display:"inline"}}>📢🤩 入場優惠</div><div style={{color:"red",display:"inline"}}>八五折 ❗❗</div></Marquee> */}
    </div>

  <Component {...pageProps} />
</div>}

 </div>
    )
  }


export default MyApp


