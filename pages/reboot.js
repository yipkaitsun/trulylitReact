import Head from 'next/head';
import React,{Component} from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Spin, Result, notification } from 'antd';
import locale from 'antd/lib/locale-provider/zh_HK';
import Cookies from 'universal-cookie';
import 'moment/locale/zh-hk';
import { UserOutlined, MailOutlined,FieldTimeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { Markup } from 'interweave';
import '../styles/app.css';
import Slider from 'react-animated-slider';
import '../styles/slider.css';
import horizontalCss from '../styles/horizontal.css';
const cookies = new Cookies();
const { TextArea } = Input;

class Reboot extends Component{
    
    constructor(props){
        super(props);
        this.state={
           login:false,
           loading:true,
           finish:false,
           submitload: false,
            banner: [],
            content: "",

        }
        
        axios.post("https://api.trulylittlethings.com/auth",{token:cookies.get("access_token"),refresh:cookies.get("refresh_token")})
            .then((response) => {
                axios.post("https://trulylittlethings.herokuapp.com/loadPage-api", { function: "loadPage", page: "reboot" }
                ).then((load) => {
                    this.setState({ loading: false,banner:load.data.slider,content:load.data.content});
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
            })


         this.disabledDateTime=()=> {
            return {
                disabledHours: () => [0,1,2,3,4,5,6,7,8,9,10,21,22,23],
          
            };
        }

        this.onFinish = values => {
        this.setState({submitload:true})
          axios
          .post('https://api.trulylittlethings.com/reboot', {form:values,token:cookies.get("access_token")})
          .then(res  => {
              if (res.data.result == true) {
                  this.setState({ submitload: false, finish: res.data.result })
              }
              else {
                  notification.open({
                      message: 'Fail',
                      description:
                          'The input information is incorrect'
                  });
              }
          }
       )
          .catch(err => {
              this.setState({submitload:false});
              console.log(err);
           });    
          
      };
    }

 
  render(){
    return(
        <div style={{width:"100%"}}>
              <Head>
        <title>TrulyLittleThings | Reboot</title>
      </Head>
            <Slider previousButton={null} nextButton={null} autoplay={2000} classNames={horizontalCss}>
                {this.state.banner.map((item, index) => (
                    <div
                        key={index}
                        className="slider-content"
                        style={{ background: `url('${item.image}') no-repeat center center` }}
                    >
                        <div className="inner" style={{ top: "65%" }}>
                            <h1>{item.title}</h1>
                            <a href={item.url}><Button shape="round">{item.button}</Button></a>
                        </div>
                    </div>
                ))}
            </Slider>

            <div style={{ width: "80%", margin: "auto" }}>
            <h2 style={{paddingTop:30}}>#Reboot 放空</h2><br/>
            <div style={{ fontSize: "15px" }}>
                <Markup content={this.state.content}/>
                
            <hr/><h3>喺呢度預約啦！</h3>
            </div>
           {
            this.state.loading===true?
            <div style={{textAlign:"center"}}><br/><br/>
            <Spin size="large" /> </div>:
           
           this.state.login===true?
           this.state.finish===false?
           
           <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                layout="vertical"
                >
                <Form.Item label="稱呼:"
                    name="username"
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                </Form.Item>
                <Form.Item label="聯絡電郵地址:"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item label="電話號碼:"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your Phone!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone" />
                </Form.Item>
                <p style={{fontSize:"15px"}}>開放時間 <br/><br/><strong>星期一至星期日 11:00-21:00</strong></p><hr/>
                <Row>
                    <Col>
                <Form.Item label="擬預約日期:"
                    name="date"
                    rules={[{ required: true, message: 'Please input the Date!' }]}
                    style={{width:"100%"}}
                >
                <DatePicker disabledTime={this.disabledDateTime} locale={locale}  style={{width:"100%"}} showTime format="YYYY-MM-DD HH:mm" />
                </Form.Item>
                
             </Col>
             <Col>
                <Form.Item label="擬預約時數:"
                    name="hour"
                    style={{width:"100%"}}
                    rules={[{ required: true, message: 'Please input the Time!' }]}
                >
                    
                <InputNumber prefix={<FieldTimeOutlined  className="site-form-item-icon" />} style={{width:"100%"}}/>
                </Form.Item>
                </Col>
                </Row>
                
                <Form.Item label="有冇咩想同小籽講或者其他特別要求?"  name="req"   >
                    <TextArea allowClear  autoSize={{ minRows: 3, maxRows: 5 }} placeholder="Your Message" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.submitload}>
                    Submit
                    </Button>
                </Form.Item>
                </Form>:
               
               <Result
                  status="success"
                  title="Successfully Book"
                  subTitle="Please simply check your inbox."
                />
           
           :<h5>您必須 <a href="./login.html">登錄</a> 才能進行預約。</h5>} 
            <br /><br />
            </div>
        </div>
    )
}
}
export default Reboot;

