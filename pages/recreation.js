import Head from 'next/head';
import React, { Component } from 'react';
import '../styles/app.css'
import Cookies from 'universal-cookie';
import PageIndicator from '../components/pageIndicator';
import "react-multi-carousel/lib/styles.css";
import Activity from '../components/activity';
import { Button} from 'antd';
import '../styles/slider.css';
import { Markup } from 'interweave';
import axios from 'axios';
import Slider from 'react-animated-slider';
import '../styles/slider.css';
import horizontalCss from '../styles/horizontal.css';


const cookies = new Cookies();
class recreation extends Component {
    constructor(props){
        super(props);
        this.state={
            banner: [],
            content:'',
        }
        axios.post("https://trulylittlethings.herokuapp.com/loadPage-api", { function: "loadPage", page: "recreation" }
        ).then((response) => {
            console.log(response);
            if (response.data.result == true) {
                this.setState({ banner: response.data.slider, content: response.data.content });
            }
        })
    }
    
    render() {
   
                
          
    return (
        <div style={{ width: "100%", margin: "auto" }}>

            <Slider previousButton={null} nextButton={null} autoplay={2000} classNames={horizontalCss}>
                {this.state.banner.map((item, index) => (
                    <div
                        key={index}
                        className="slider-content"
                        style={{ background: `url('${item.image}') no-repeat center center` }}
                    >
                        <div className="inner" style={{ top: "65%" }}>
                            <h1>{item.title}</h1>
                        </div>
                    </div>
                ))}
            </Slider>

           <Head>
        <title>TrulyLittleThings | Recreation</title>
            </Head>

            <div style={{ width: "80%", margin: "auto" }} className="recreation">
    <PageIndicator>創作</PageIndicator><br/>
    <h2 style={{paddingTop:30}}>#RECREATION 創作</h2><br/>
            <div style={{ fontSize: "15px" }}>
                    <Markup content={this.state.content} />
                    <br />
                    <Button size="large" onClick={() => { window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSedvRpUUmCM4FJF9TMPc1_7m2xWiL7uhQ9IoCRyrLRG1UV7Yw/viewform"}}>一般活動租場申請</Button>
</div>
<hr/>
<h2 style={{textAlign:"center"}}>最新活動</h2><br/>
            <Activity />
            </div>
                </div>  
                                
    )
  }
}
export default recreation;