import Head from'next/head';
import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, AimOutlined, } from '@ant-design/icons';
import { Elements } from "@stripe/react-stripe-js";
import Cookies from 'universal-cookie';
import CheckoutForm from "../components/CheckoutForm";
import PageIndicator from '../components/pageIndicator';
import axios from 'axios';
import OrderSummary from "../components/OrderSummary";
import { Empty, Spin } from 'antd';


import { Col, Row, Form, Input, Button, Steps, Radio, Select, Result } from "antd";

const cookies = new Cookies();


class checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      login: false,
      product: [],
      price: 0,
      shppingfee: 0,
      current: 0,
      name: "",
      email: "",
      phone: null,
      paymethod: "PAYME",
      method: "自取",
      flat: "",
      block: "",
      floor: "",
      building: "",
      street: "",
      express: "",
      pickuppoint: "",
    }

  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }


  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const quantity = urlParams.get('quantity')


    if (id !== null) {

      axios.post("https://api.trulylittlethings.com/checkoutProduct-api", { id: id })
        .then((response) => {
          console.log(response.data.product[0]);
          this.setState({ product: [{ pid: id, quantity: parseInt(quantity),name:response.data.product[0].name,subtotal:response.data.product[0].subtotal*parseInt(quantity)}], price: response.data.product[0].subtotal*parseInt(quantity), loading: false }); 
        });
    }

    else {

      axios.post("https://api.trulylittlethings.com/getCart-api", { access_token: cookies.get("access_token") })
        .then((response) => {
          if (response.data.statusCode === 0) {
            var tempcart=[];
            var price=0;
            response.data.item.map((arr,index,{length})=>{
              tempcart.push({pid:arr.pid,quantity:arr.quantity,name:arr.name,subtotal:arr.subtotal});
              price+=arr.subtotal;
            })
           this.setState({loading:false,product:tempcart,price:price});
          }

          else {
            var cartarray = cookies.get("cart");
            console.log(cartarray);
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
                    })
                  });
                  this.setState({ product: tempcart, loading: false });
                  this.state.product.map((arr, index, { length }) => {
                    this.setState({ price: this.state.price += arr.subtotal });
                  })
                }
                )
            }
            catch (err) {
            }
          }
        }
      )
    }
  }

  render() {
    const stripePromise = loadStripe(
      "pk_test_51HcTyyEB60BHODB71lzLLaTyCFQOUlvIPgGFU5SFGAk4WJKZK1M73NX6KDSva8CMmEvuxdq80kY3hBPamlvP6BVr00mmx5SPOi", { locale: 'en' }
    );

    const onFinish = values => {
      this.setState(values);
      this.next();

    };

    const onFinish2 = (values) => {
      this.next();
      this.setState(values);
            axios.post("https://api.trulylittlethings.com/checkoutsql-api"
              , {
                product:this.state.product,
                name: this.state.name, email: this.state.email, phone: this.state.phone, paymentmethod: this.state.paymethod,
                method: this.state.method, flat: this.state.flat, block: this.state.block, floor: this.state.floor, building: this.state.building,
                street: this.state.street, express: this.state.express, pickuppoint: this.state.pickuppoint, token: cookies.get("access_token")
              })
              .then(function (response) {

              })
        

    };

    const onChangeRadio = (e) => {
      this.setState({ method: e.target.value });
      if (e.target.value === "自取") {
        const filteredAry = this.state.product.filter(e => e.name !== "Shipping Fee");
        this.setState({ product: filteredAry, shppingfee: 0 });
      }

      else if (e.target.value === "平郵") {
        this.state.product.push({ name: "Shipping Fee", subtotal: 15, quantity: 1 });
        this.setState({ shppingfee: 15 })
      }

      else if (e.target.value === "速遞到付") {
        const filteredAry = this.state.product.filter(e => e.name !== "Shipping Fee");
        this.setState({ product: filteredAry, shppingfee: 0 });
      }
    }

    const onChangeRadio2 = (e) => {

      this.setState({ paymethod: e.target.value });
    }
    const { TextArea } = Input;
    const { Step } = Steps;
    const { current } = this.state;
    const steps = [
      {
        title: 'Contact',
        content:
          <Form
            name="normal_contact"
            className="contact-form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item label="稱呼"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
              initialValue={this.state.name}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="稱呼" />
            </Form.Item>
            <Form.Item label="聯絡電郵地址:"
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
              initialValue={this.state.email}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="電郵地址" />
            </Form.Item>


            <Form.Item label="聯絡電話號碼:"
              name="phone"
              style={{ width: "100%" }}
              rules={[{ required: true, message: 'Please input the Phone Number!' }]}
              initialValue={this.state.phone}
            >

              <Input type="number" prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="電話號碼" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" className="login-form-button" >
                Submit
              </Button>
            </Form.Item>


          </Form>,
      },
      {
        title: 'Shipping',
        content:
          <div>
            <Radio.Group onChange={onChangeRadio} size="large" defaultValue={this.state.method} value={this.state.method} style={{ width: "100%" }}>
              <Radio.Button style={{ width: "33%" }} value="自取">自取</Radio.Button>
              <Radio.Button style={{ width: "33%" }} value="平郵">平郵</Radio.Button>
              <Radio.Button style={{ width: "33%" }} value="速遞到付">速遞到付</Radio.Button>
            </Radio.Group>
            <br /> <br />

            {this.state.method === "速遞到付" ?
              <Form style={{ width: "100%" }}
                name="shipping-express-form"
                className="shipping-express-form"
                onFinish={onFinish}
                layout="vertical"
              >

                <Form.Item style={{ width: "100%" }} label=" 速遞公司" name="express" initialValue={this.state.express}  >
                  <Select>
                    <Select.Option value="852Express">852 Express</Select.Option>
                    <Select.Option value="KingKong">King Kong</Select.Option>
                    <Select.Option value="sfExpress">順豐</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item style={{ width: "100%" }} label="如選用自取點.請在以下填寫有關資料 "
                  name="pickuppoint"
                  initialValue={this.state.pickuppoint}
                >
                  <TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} placeholder="Your Message" />
                </Form.Item>
                <hr />
                如選用送貸上門.請在以下填寫有關資料<br /><br />
                <Form.Item style={{ width: "33%" }} label="單位"
                  name="flat"
                  initialValue={this.state.flat}
                >
                  <Input placeholder="單位" />
                </Form.Item>
                <Form.Item style={{ width: "33%" }} label="樓層"
                  name="floor"
                  initialValue={this.state.floor}
                >
                  <Input placeholder="樓層" />
                </Form.Item>
                <Form.Item style={{ width: "33%" }} label="座"
                  name="block"
                  initialValue={this.state.block}
                >
                  <Input placeholder="座" />
                </Form.Item>

                <Form.Item label="大廈:"
                  name="building"
                  style={{ width: "100%" }}
                  initialValue={this.state.building}
                >
                  <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="大廈" />
                </Form.Item>


                <Form.Item label="街道:"
                  name="street"
                  style={{ width: "100%" }}
                  initialValue={this.state.street}
                >

                  <Input prefix={<AimOutlined className="site-form-item-icon" />} />
                </Form.Item>


                <Form.Item style={{ width: "100%" }}>
                  <Button style={{ width: "50%" }} type="primary" htmlType="submit">SUBMIT</Button>
                  <Button style={{ width: "50%" }} type="secondary" onClick={() => this.prev()} >PREVIOUS</Button>


                </Form.Item>
              </Form>
              : null}

            {this.state.method === "平郵" ?
              <Form style={{ width: "100%" }}
                name="shipping-flat-form"
                className="shipping-flat-form"
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item style={{ width: "33%" }} label="單位"
                  name="flat"
                  initialValue={this.state.flat}
                >
                  <Input placeholder="單位" />
                </Form.Item>
                <Form.Item style={{ width: "33%" }} label="樓層"
                  name="floor"
                  initialValue={this.state.floor}
                >
                  <Input placeholder="樓層" />
                </Form.Item>
                <Form.Item style={{ width: "33%" }} label="座"
                  name="block"
                  initialValue={this.state.block}
                >
                  <Input placeholder="座" />
                </Form.Item>

                <Form.Item label="大廈:"
                  name="building"
                  style={{ width: "100%" }}
                  initialValue={this.state.building}
                >
                  <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="大廈" />
                </Form.Item>


                <Form.Item label="街道:"
                  name="street"
                  style={{ width: "100%" }}
                  initialValue={this.state.street}
                >

                  <Input prefix={<AimOutlined className="site-form-item-icon" />} />
                </Form.Item>


                <Form.Item style={{ width: "100%" }}>
                  <Button style={{ width: "50%" }} type="primary" htmlType="submit">SUBMIT</Button>
                  <Button style={{ width: "50%" }} type="secondary" onClick={() => this.prev()} >PREVIOUS</Button>


                </Form.Item>
              </Form> : null}

            {this.state.method === "自取" ?
              <div style={{ width: "100%" }}>
                <Button style={{ width: "50%" }} type="primary" onClick={() => this.next()} >SUBMIT</Button>
                <Button style={{ width: "50%" }} type="secondary" onClick={() => this.prev()} >PREVIOUS</Button>
              </div>
              : null}


          </div>
        ,
      },
      {
        title: 'Payment',
        content:
          <div>
            <Radio.Group onChange={onChangeRadio2}
              size="large"
              defaultValue={this.state.paymethod}
              value={this.state.paymethod}
              style={{ width: "100%" }}>
              <Radio.Button style={{ width: "33%" }} value="PAYME">PAYME</Radio.Button>
              <Radio.Button style={{ width: "33%" }} value="FPS">FPS</Radio.Button>
              {this.state.price < 0 ?
                <Radio.Button style={{ width: "33%" }} value="CARD">CARD</Radio.Button> : null}
            </Radio.Group>
            <br /><br />
            {this.state.paymethod === "CARD" ?
              <Elements stripe={stripePromise}>
                <CheckoutForm prev={this.prev.bind(this)} next={onFinish2.bind(this)} email={this.state.email} phone={this.state.phone} price={(this.state.price + this.state.shppingfee) * 100} />
              </Elements> : null}
            {this.state.paymethod === "PAYME" ?
              <div style={{ width: "100%" }}>
                <Button style={{ width: "50%" }} type="primary" onClick={() => onFinish2()} >SUBMIT</Button>
                <Button style={{ width: "50%" }} type="secondary" onClick={() => this.prev()} >PREVIOUS</Button>
              </div> : null}
            {this.state.paymethod === "FPS" ?
              <div style={{ width: "100%" }}>
                <Button style={{ width: "50%" }} type="primary" onClick={() => onFinish2()} >SUBMIT</Button>
                <Button style={{ width: "50%" }} type="secondary" onClick={() => this.prev()} >PREVIOUS</Button>
              </div> : null}

          </div>,
      }, {
        title: 'Finish',
        content:
          <Result
            status="success"
            title="Successfully Purchased"
            subTitle="If using PAYME or FPS please simply check your inbox complete your purchasing."

          />,
      }
    ];

    return (


      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
            <Head>
        <title>TrulyLittleThings | Checkout</title>
        </Head>
        <PageIndicator>結帳</PageIndicator><br />
        {
          this.state.loading === true ?
            <div style={{ textAlign: "center" }}>
              <br />
              <Spin size="large" /> </div> :
            this.state.product.length === 0 ? <Empty /> :
              <Row>
                <Col xs={24} md={12}>
                  <Steps current={current}>
                    {steps.map(item => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>

                  <div className="steps-content">
                    <br />
                    {steps[current].content}</div>

                </Col>
                <Col className="orderSummary" style={{ paddingTop: "30px",paddingRight:"0px",paddingLeft: "15px" }} xs={24} md={12}>
                  <OrderSummary product={this.state.product} price={this.state.price + this.state.shppingfee} />
                </Col>


              </Row>
        }
      </div>)
  }
}
export default checkout