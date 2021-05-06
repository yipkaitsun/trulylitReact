import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button } from 'antd';
import Newproduct from '../components/product';
import CarouselItem from "react-multi-carousel";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { Row, Col } from 'react-bootstrap';
import { Markup } from 'interweave';
import "react-multi-carousel/lib/styles.css";
import Activity from '../components/activity';
import CardPrice from '../components/price';
import Slider from 'react-animated-slider';
import '../styles/slider.css';
import horizontalCss from '../styles/horizontal.css';
import '../styles/app.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [instruction, setinstruction] = useState("");
    const [slider, setSlider] = useState([]);
    useEffect(() => {
        axios.post("https://trulylittlethings.herokuapp.com/loadPage-api", { function: "loadPage", page: "index" })
            .then((response) => {
                if (response.data.result == true) {
                    setinstruction(response.data.content)
                    setSlider(response.data.slider)
                }
            });
    }, []);

    
  const aboutpic=[
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(1).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(2).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(3).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(4).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(5).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(6).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(7).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(8).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(9).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(10).jpg',
    },
    {
      image: 'https://www.trulylittlethings.com/resources/aboutpic(11).jpg',
    },
  ]


  return (

    <div className={styles.container}>
      <Head>
        <title>TrulyLittleThings</title>
        <link rel="icon" href="/favicon.ico" />
          </Head>
          <div id="indexSlider">
          <Slider autoplay={7000} classNames={horizontalCss}>
              {slider.map((item, index) => (
          <div 
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` }}
          >
           <div className="inner" style={{top:"65%"}}>
              <h1>{item.title}</h1>
              <a href={item.url}><Button shape="round">{item.button}</Button></a>
            </div>
          </div>
        ))}
      </Slider>
</div>
      <div style={{ textAlign: "center", fontSize: "15px", lineHeight: 1.5, width: "80%", marginLeft: "auto", marginRight: "auto", color: "#6f6f6f" }}>
        <Zoom left cascade>
          <div className="instruction"> 
            <br />
            <Markup content={instruction}/>
          </div>
        </Zoom>

        <hr />
       <div className="newProduct">
       <h2 style={{ color: "black" }}>最新產品</h2>
          <Newproduct/>

       </div><br/>
        <div className="event">
          <Fade left delay={100} duration={2000}>
            <h2 style={{ color: "black" }}>最新活動</h2>
            <Activity />
          </Fade>
        </div>
        
        <hr />
        <div className="plan">
          <h2 style={{ color: "black" }}>價錢</h2>
          <CardPrice/>


        </div><br/>
        <Row xs={1} md={2}>
          <Col style={{ textAlign: "left" }}>
          <Slider autoplay={5000} classNames={horizontalCss}>
        {aboutpic.map((item, index) => (
          <div 
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` ,backgroundSize:"contain !important"}}
          >
          </div>
        ))}
      </Slider>
          </Col>
          <Col style={{ textAlign: "left" }}>
        <div style={{ paddingTop: "10px" }} className="ser">
          <h2 style={{ color: "black", textAlign:"center"}}>服務及設備</h2>
          <CarouselItem responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 3000 },
              items: 3
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 3
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 3
            }
          }} infinite={false} >


            <div className="service" >
              <img src="./resources/service icon-01.png" />
            </div>

            <div className="service" >
              <img src="./resources/service icon-02.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-03.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-04.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-05.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-06.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-07.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-08.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-09.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-10.png" />
            </div>

          </CarouselItem>
        </div>


        <div className="mat">
          <h2 style={{ color: "black",textAlign:"center" }}>物料及工具</h2>
          <CarouselItem responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 3000 },
              items: 3
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 3
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 3
            }
          }} infinite={false}>


            <div className="service">
              <img src="./resources/service icon-11.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-12.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-13.png" />
            </div>

            <div className="service">
              <img src="./resources/service icon-14.png" />
            </div>

             <div className="service">
              <img src="./resources/service icon-15.png" />
            </div>

          </CarouselItem>
        </div>
        </Col>
        </Row>
        <br />
        <Fade left delay={100} duration={1800}>
          <Row xs={1} md={2}>

            <Col style={{ textAlign: "left" }}><h2 style={{ margin: "0px" }}>誰是小籽</h2>
              <p>&nbsp;</p>
              <p>聖經所記，極細的種籽也能帶來改變和希望。</p>
              <p>在這小小的共享空間，集合創作人、藝術治療師、輔導員，</p>
              <p>並希望透過多元化創作媒介，在不同的體驗中，可自由表達自己、可發揮更多可能以及重燃希望。</p>
              <p><a href="https://www.trulylittlethings.com/about.html">想知更多</a></p>
              <hr />
              <h2>營業時間</h2>
              <p><strong>星期一至六</strong><br />
          11:00 – 21:00<br/>星期日需預約</p>
            </Col>

            <Col style={{ textAlign: "left" }}>

              <h2>聯絡我們</h2>
              <p><strong>地址</strong></p>
              <p>葵涌大連排道３５號金基工業大廈７樓Ｃ</p>
              <p><strong>預約及查詢</strong><br />63130460</p>
              <p><strong>Email</strong><br />hello@trulylittlethings.com<br />
                <iframe style={{ border: 0 }} tabIndex="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.7243627833013!2d114.13212655021009!3d22.364034285218324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f8999aaaf715%3A0x2d3fc9c25f6078cc!2z6JG15raM5aSn6YCj5o6S6YGTMzXomZ_ph5Hln7rlt6Xmpa3lpKflu4g!5e0!3m2!1szh-TW!2shk!4v1598424090741!5m2!1szh-TW!2shk" width="100%" height="450" frameBorder="0" allowFullScreen="allowfullscreen" aria-hidden="false"></iframe></p>
            </Col>

          </Row>
        </Fade>
      </div>
    </div>
  )
}
