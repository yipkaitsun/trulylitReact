import Head from 'next/head';
import React from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import PageIndicator from '../components/pageIndicator';
import Readmore from '../components/readmore'
import CarouselItem from "react-multi-carousel";
import { ShoppingCartOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import "react-multi-carousel/lib/styles.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { notification, Empty, Spin, Radio } from 'antd';
import { NumberPicker } from 'react-widgets'
import '@brainhubeu/react-carousel/lib/style.css';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
const cookies = new Cookies();




class product extends React.Component {

  responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      soldout:false,
      id: 0,
      value: 0,
      detail: [],
      relatedPro: [],
      subtype: [],
      quantity: 1,
      login: false,
      loading: true,
      options: [],
      slide: [],
      info:"",

    }
  }



  componentDidMount() {
      this.loadID();
     
  }

  addToCart = () => {
    const quantity = this.state.quantity;
    const cartProp = { quantity, id: this.state.id, access_token: cookies.get("access_token") };
    var product = "";
    product = this.state.detail[0].name;

    if (this.state.login === true) {
      axios.post("https://api.trulylittlethings.com/cart-api", { cartProp: cartProp }
      ).then((response) => {
        if (response.data.statusCode === 200) {
          this.openNotification(product, response.data.msg, <CheckCircleOutlined style={{ color: '#108ee9' }} />);
        }
        else {
          this.openNotification(product, response.data.msg, <WarningOutlined style={{ color: "red" }} />);
        }
      })
        .catch(function (error) {
          console.log(error);
        });

    }
    else {
      var cartarray = [];
      var cartobj = {};

      try {

        cartarray = cookies.get("cart");
        cartobj = {
          id: this.state.id,
          quantity: this.state.quantity
        };
        if (cartarray.length < 10) {
          cartarray.push(cartobj);
          cookies.set('cart', cartarray, { path: '/' })
          this.openNotification(product, "Product successfully addeded to your shopping cart.", <CheckCircleOutlined style={{ color: '#108ee9' }} />);
        }
        else {
          this.openNotification(product, "Your Shopping cart has been fulled.", <WarningOutlined style={{ color: "red" }} />);
        }
      }
      catch (err) {
        var cartarray = [];
        cartarray.push(cartobj);
        cookies.set('cart', cartarray, { path: '/' })
        this.openNotification(product, "Product successfully addeded to your shopping cart.", <CheckCircleOutlined style={{ color: '#108ee9' }} />);
      }
    }
  }

  onchangeSubtype = e => {
    this.setState({ id: e.target.value });
    this.loadSubtypeData(e.target.value);

  }
  openNotification(product, msg, icon) {
    notification.open({
      message: product,
      description: msg,
      icon: icon,

    });
  };
  onChange = value => {
    this.setState({ value: value });
  }

    loadSubtypeData(id) {
        var info = "";
        var slide = [];
        const found = this.state.subtype.filter(element => element.id == id);
        found.map((arr, index, { length }) => (
            JSON.parse((arr.product_image)).map((val, index, { length }) => (
                slide.push(<InnerImageZoom src={val} zoomSrc={val} />
             )))
    ));
    JSON.parse((found[0].extra_information)).map((arr, index, { length }) => {
      info+=arr+"\n";
    })

    this.setState({ detail: found, slide: slide,info:info });
  }

  loadID() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = parseInt(urlParams.get('id'));
    this.setState({ id: id }, () => {
      this.loadData(this.state.id);
      axios.post("https://api.trulylittlethings.com/auth", { token: cookies.get("access_token"), refresh: cookies.get("refresh_token") })
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.setState({ login: true });
            if (response.data.msg === "refresh") {
              cookies.set('access_token', response.data.access_token, { path: '/' })
            }
          }
          else {
            this.setState({ login: false });
          }
        });
    });

  }
  loadData(id) {
    var slide = []; 
    this.setState({ loading: true });
    axios.post("https://api.trulylittlethings.com/getproduct", { id: id })
      .then((response) => {
        this.setState({ loading: false });
        if (response.data.msg != null) {
          
            try {
              response.data.slide.map((arr,index,{length})=>{
                  slide.push(<InnerImageZoom src={arr.src} zoomSrc={arr.src} />)
              })
            }
            catch (err) {
            }
          
          this.setState({detail: response.data.product.product, relatedPro: response.data.relatedPro.relatedPro,info:response.data.info,subtype: response.data.subtype.subtype, options: response.data.options, slide: slide, quantity: 1,soldout:response.data.soldout});
        }
      });

  }
    render() {


    return (
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
      <Head>
                <title>TrulyLittleThings | Product</title>
      </Head>
        <p style={{ textAlign: "center", fontSize: "25px", paddingTop: "30px", marginBottom: 0 }}>
          <strong >{this.state.detail.map((arr, index, { length }) => (arr.name))}</strong>
        </p>


        {this.state.loading === true ?
          <div style={{ textAlign: "center" }}>
            <br />
            <Spin size="large" /> </div> :

          this.state.detail.length !== 0 ?
            <Row>
              <Col className="paddingTop30" xs={12} md={6}>
                <Carousel clickToChange
                  value={this.state.value}
                  onChange={this.onChange}
                  slides={this.state.slide}
                >
                </Carousel>
                <Dots
                  value={this.state.value}
                  onChange={this.onChange}
                  thumbnails={this.state.slide}
                />
              </Col>

              <Col className="paddingTop30" xs={12} md={6} >
                <div>
                  <p>PRODUCT INFORMATION</p>

                    {this.state.detail[0].price>this.state.detail[0].discount_price ?
                    
                  <div>
                    <h4 className="strikethrough">${this.state.detail[0].price}</h4>
                    <h2 style={{paddingLeft:"10px",display: "inline"}}>${this.state.detail[0].discount_price}</h2>
                    </div>:<h2 style={{paddingLeft:"10px",display: "inline"}}>${this.state.detail[0].price}</h2>
                  }
                  <div> 
                   
                    <Readmore info={this.state.info}></Readmore>
                  </div>
                  <h4 style={{ color: "#6f6f6f" }}>Quantity:</h4>
                  <div><NumberPicker min={1} defaultValue={1} onChange={value => this.setState({ quantity: value })} /></div>

                  <br />
                  <Radio.Group
                    options={this.state.options}
                    defaultValue={this.state.id}
                    onChange={this.onchangeSubtype}
                    optionType="button"
                    buttonStyle="solid"
                    value={this.state.id}

                  />
                  <hr />
                  <div><ButtonGroup size="lg" className="mb-2">
                    <Button onClick={this.addToCart} variant="outline-success"><div><ShoppingCartOutlined style={{ fontSize: "1.6em", paddingRight: "5px" }} />ADD TO CART</div></Button>
                    <Button href={"./checkout.html?id=" + this.state.id + "&quantity=" + this.state.quantity} variant="outline-info"> <div><CheckCircleOutlined style={{ fontSize: "1.6em", paddingRight: "5px" }} />CHECKOUT</div></Button>
                  </ButtonGroup>
                  </div>
                        
                        {this.state.soldout===true?
                        <div>
                         <hr/>
                          <h4>
                            Remark:
                          </h4>
                          <br/>
                          <p>商品已售罄，你的訂單將會列為預購貨品 </p>
                        </div>:null}


                </div>
              </Col>
            </Row>
            : <Empty />}
        <PageIndicator>RELATED PRODUCT</PageIndicator><br />
        <div style={{ margin: "auto", width: "95%" }}>
          <CarouselItem responsive={this.responsive} infinite={true}>
            {this.state.relatedPro.map((val, index) => {

              return (<div style={{ height: "100%" }} key={"product" + index} >
                <Card style={{ width: '100%'}}>
                  <a href={"./product.html?id=" + val.id}>
                    <Card.Img variant="top" src={val.image} />
                  </a>
                  <Card.Body>

                    <a href={"./product.html?id=" + val.id}><Card.Title >{val.name}</Card.Title></a>

                    <Card.Text>

                    </Card.Text>
                    <Card.Text style={{ fontSize: 18, color: "black" }}>
                      ${val.price}</Card.Text>
                  </Card.Body>
                </Card>

              </div>
              )
            })}
          </CarouselItem>
        </div>
      </div>
    )
  }
}
export default product