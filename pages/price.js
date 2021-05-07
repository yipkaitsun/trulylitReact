import Head from 'next/head'
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import '../styles/slider.css';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import styles from '../styles/Home.module.css'
import '../styles/app.css'
import "react-multi-carousel/lib/styles.css";
import CardPrice from '../components/price';

class Price extends Component {
  render() {
    return (
      <div className="price-page" style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
          <Head>
        <title>TrulyLittleThings | Price</title>
      </Head>
             <div className="plan">
                <h2 style={{ color: "black", textAlign: "center" }}>價錢</h2>
                <CardPrice/>
        </div>
        </div>
    )
  }
}
export default Price;