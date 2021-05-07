import Head from 'next/head';
import React, { Component } from 'react';
import { Markup } from 'interweave';
import { Form, Input, Button, Radio,Result, InputNumber } from "antd";
import { Row, Col } from 'react-bootstrap';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import PageIndicator from '../components/pageIndicator';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class workshop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      slogon: "",
      detail: "",
      login: false,
      content: "",
      youtube: null,
      class: [],
      loading:false,
      success:false,
    }
  }
  componentDidMount() {
    this.loadID();
  }

  onFinish = values => {
  this.setState({loading:true});
    axios
      .post('https://trulylittlethings.herokuapp.com/recreation-api', { form: values, token: cookies.get("access_token") })
      .then(res => {
      this.setState({loading:false});
      if (res.data.result==true){
      this.setState({success:true})
      }
      else{
       this.setState({success:false})
      }
      }
      )
      .catch(err => {
        console.log(err);
      });

  };

  loadID() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = parseInt(urlParams.get('id'));

    this.setState({ id: id }, () => {
      this.loadData(id);
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
    axios.post("https://api.trulylittlethings.com/workshop-api", { id: id })
      .then((response) => {
        console.log(response);
        this.setState({ name: response.data.result[0].name });
        this.setState({ slogon: response.data.result[0].slogon });
        this.setState({ detail: response.data.result[0].detail });
        this.setState({ content: response.data.result[0].content });
        this.setState({ youtube: response.data.result[0].youtube });
        this.setState({ reference: response.data.result[0].reference });
        this.setState({ class: JSON.parse(response.data.result[0].class) });

      })

  }



  render() {
    console.log(this.state.detail);
    return (

      <div className="recreation-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
          <Head>
        <title>TrulyLittleThings | Workshop</title>
      </Head>
        <PageIndicator>{this.state.name}</PageIndicator><br />
        <h4 style={{ textAlign: "center" }}>
          {this.state.slogon}
        </h4>
        <br />

        <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center", lineHeight: "200%", padding: "50px", fontSize: "17px", backgroundColor: "#ffeaf08c" }}>
          <Markup content={this.state.detail} /><br />
      
        </div>
        <br />
        <div style={{ fontSize: "15px" }}>
          <Row xs={1} md={3}>
            <Col style={{ fontSize: "15px" }}>
              <div style={{ paddingTop: "20px" }}>
                <Markup content={this.state.content} /> </div></Col>

            {this.state.youtube === null ? null :
              <Col>
                <div style={{ paddingTop: "20px" }}>
                  <iframe width="100%" height="315" src={this.state.youtube} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </Col>}
            {this.state.reference === null ? null :
              <Col>
                <div style={{ paddingTop: "20px" }}>
                  <Markup content={this.state.reference} />
                </div> </Col>
            }
          </Row>
                <hr style={{borderTop: "2px solid rgba(0,0,0,.1)"}}/><br/>
                {
			  
			  this.state.success===false?
			  
			  this.state.login === true ?
            <Form
              name="normal_login"
              className="login-form"
              onFinish={this.onFinish}
              layout="vertical"
            >
              <Form.Item
                label="選項:"
                name="課程" rules={[{ required: true, message: 'Please input your class' }]}>
                <Radio.Group>
                  {this.state.class.map((val, index) => {
                    return (
                      <Radio value={val}>{val}</Radio>

                    )
                  })

                  }

                </Radio.Group>
              </Form.Item>
              <Form.Item label="聯絡電郵地址:"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>

              <Form.Item label="聯絡電話:"
                name="phone"
                rules={[{ required: true, message: 'Please input your Phone!' }]}
              >
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone" />
              </Form.Item>
               <Form.Item label="參加人數:" rules={[{ type: 'number', min: 1, max: 99, message: 'Number should larger than 1 !'  }]}
                name="attendNo"
              >     
              <InputNumber />
              </Form.Item>



              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                  Submit
                    </Button>
              </Form.Item>
            </Form> : <a href="./login.html">Please Login</a>:<Result
    status="success"
    title="Successfully Booking"
   
  />
          }
        </div>
        <br /><br /><br />




      </div>



    )
  }
}
export default workshop;