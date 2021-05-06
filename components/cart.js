import React, { Component } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { Empty, Badge, Button, Spin } from 'antd';
import Cookies from 'universal-cookie';
import PageIndicator from '../components/pageIndicator';
import OrderSummary from "../components/OrderSummary";
import Animate from 'rc-animate';
import axios from "axios";
import { DownloadOutlined } from '@ant-design/icons';
const cookies = new Cookies();

class Cart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product: [],
      cartproduct: [],
      subtotal: 0,
      login: false,
      loading: true,
      show: []
    }
    axios.post("https://api.trulylittlethings.com/auth", { token: cookies.get("access_token"), refresh: cookies.get("refresh_token") })
      .then((response) => {
        const res_login = response;
        var show = [];
        if (response.data.statusCode === 200) {

          this.setState({ login: true });
          if (res_login.msg === "refresh") {
            cookies.set('access_token', res_login.access_token, { path: '/' })
          }

          axios.post("https://api.trulylittlethings.com/getCart-api", { access_token: cookies.get("access_token") })
            .then((response) => {
              this.setState({cartproduct: JSON.parse(response.request.response).item});
              var temtotal=0;
              this.state.cartproduct.map((arr, index, { length }) => {
                show.push(true);
                temtotal+=arr.subtotal;
              })
              this.setState({ show: show ,loading : false,subtotal:temtotal });
            })
        }
        else {
          var cartarray = cookies.get("cart");
          function UniqueId(value, index, self) {
            var flag = true;
            for (var i = index + 1; i < self.length; i++) {
              if (value.id === self[i].id) {
                flag = false;
                break;
              }
            }
            return flag;
          }
          try {
            var filtercartid = cartarray.filter(UniqueId);
            if (filtercartid === "") {
              this.setState({ loading: false });
            }
            axios.post("https://api.trulylittlethings.com/cart_logout-api", { cartid: filtercartid })
              .then((response) => {
                var tempcart = [];
                cartarray.map((arr, index, { length }) => {
                  const found = response.data.cart.find(element => element.id == arr.id);
                  tempcart.push({
                    pid: arr.id,
                    name: found.name,
                    quantity: arr.quantity,
                    subtotal: found.price * arr.quantity,
                    image: found.image
                  })
                  show.push(true);
                });
                this.setState({ show: show, loading: false, cartproduct: tempcart });
                this.state.cartproduct.map((arr, index, { length }) => {
                  this.setState({ subtotal: this.state.subtotal += arr.subtotal });
                })

              }
              )

          }
          catch (err) {
           this.setState({loading:false});
          }

        }
      })
  }

  onDelete = (key, e) => {
    var tempshow = this.state.show;
    tempshow[e] = false;
    this.setState({ show: tempshow });
    if (this.state.login) {
      axios.post("https://api.trulylittlethings.com/deletecart-api", { id: key })
        .then((response) => {
        });
    }
    else {
      var cartarray = cookies.get("cart");
      cartarray.splice(e, 1);
      cookies.set('cart', cartarray, { path: '/' })
    }
    this.setState({ subtotal: this.state.subtotal -= this.state.cartproduct[e].subtotal });
    setTimeout(() => {
      tempshow.splice(e, 1);
      this.state.cartproduct.splice(e, 1);
      this.setState({ cartproduct: this.state.cartproduct, show: tempshow });

    }, 1000);
  }



  render() {

    return (
      <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>

        <PageIndicator>購物車</PageIndicator><br />

        {this.state.loading === true ?
          <div style={{ textAlign: "center" }}>
            <Spin size="large" /> </div> :

          this.state.cartproduct.length !== 0 ?

            <Row>
              <Col xs={12} md={7}>
                <Row style={{ borderBottom: "1px solid", paddingTop: "20px", paddingBottom: "20px" }} >

                  <Col xs={7} style={{ color: "grey" }}  >Product</Col>
                  <Col xs={2} style={{ color: "grey" }}  >Price</Col>
                  <Col xs={2} style={{ color: "grey" }}  >Subtotal</Col>
                  <Col xs={1} > </Col>
                </Row>
                {this.state.cartproduct.map((arr, index, { length }) => {
                  return (
                    <Animate
                      component=""
                      transitionName="fade"
                    >
                      {
                        this.state.show[index] === true ?
                          <Row key={index}
                            style={{ borderBottom: "1px solid", paddingTop: "20px", paddingBottom: "20px", transition: "all .5s ease-in" }} >
                            <Col xs={2}><Badge count={arr.quantity}><img style={{ width: "100%" }} src={arr.image} /></Badge></Col>
                            <Col xs={5} style={{ display: "flex", alignItems: " center" }}>{arr.name}</Col>
                            <Col xs={2} style={{ display: "flex", alignItems: " center" }}>{arr.subtotal / arr.quantity}</Col>
                            <Col xs={2} style={{ display: "flex", alignItems: " center" }}>{(arr.subtotal)}</Col>
                            <Col xs={1} style={{ display: "flex", alignItems: " center" }}>
                              <span onClick={(e) => { this.onDelete(arr.cartid, index); }}
                              >
                                <DeleteOutlined />
                              </span></Col>
                          </Row> : null}</Animate>

                  )
                })}
              </Col>
              <Col xs={12} md={5} style={{ paddingTop: "30px" }}><OrderSummary product={this.state.cartproduct} price={this.state.subtotal} ></OrderSummary>    <br /><a href="./checkout.html"><Button type="primary" icon={<DownloadOutlined />} style={{ width: "100%" }}>
                CHECKOUT
        </Button></a></Col>

            </Row>
            : <Empty />}
      </div>

    )
  }
}
export default Cart;