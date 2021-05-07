import Head from 'next/head';
import React, { Component } from 'react';
import '../styles/app.css'
import Cookies from 'universal-cookie';
import moment from 'moment';
import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import { Collapse, DatePicker, Radio, Select, Form, Input, Button, Result, InputNumber } from 'antd';
import '../styles/slider.css';
import '../styles/app.css'
import axios from "axios";
const { Option } = Select;
const { Panel } = Collapse;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
const content = [
  {
    image: './resources/banner2.png',
  },
 
];

const time = [12, 13, 14, 15, 16, 17, 18, 19, 20,21];
const cookies = new Cookies();
class showroom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      validateStatus:{status:"success",help:""},
      meridiem: "AM",
      selectDate: "",
      activeKey: ['1'],
      time: [],
      phone: 0,
      selectTime: 0,
      ticketNumber: 1,
      selectTicket: 1,
      disabled: [false, true, true, true],
      email: "",
      name: "",
      finish: false,
      loading:false

    }

  }
  disabledDate(current) {
    var startDate = new Date(2020, 11, 29);
      var endDate = new Date(2021, 6 , 1);
    startDate = moment(startDate);
    endDate = moment(endDate);
    return current < startDate || current > endDate;
  }


  onChange = (value) => {
     if (value<=(30-this.state.ticketNumber)){
      this.setState({validateStatus:{status:"success",help:""},selectTicket:value})
    }
    else{this.setState({validateStatus:{status:"error",help:"Maximum number of session have been reached"}})}
  
  }

  finishForm = (val) => {
    this.setState({ email: val.Email, name: val.Name, phone: val.Phone,loading:true }, () => {
      try {
        axios.post("https://api.trulylittlethings.com/exhibition-api", { date: this.state.selectDate, time: this.state.selectTime, email: this.state.email, name: this.state.name, phone: this.state.phone, ticketNumber: this.state.selectTicket })
          .then((response) => {
            this.setState({ finish: true });
          });
      }
      catch (err) {
      }
    });
  }

  timeChange = e => {
    this.setState({ selectTime: e.target.value });
    axios.post("https://api.trulylittlethings.com/exhibition_number-api", { date: this.state.selectDate, time: e.target.value })
      .then((response) => {
 
        if (response.data.result.length===0){
          this.setState({ ticketNumber: 0});
        }
        else{
          this.setState({ ticketNumber: response.data.result[0].number });
        }
 
        this.setState({ disabled: [false, false, false, false],selectTicket: 1,activeKey: ['3'] });
      })
 
  };


  collapseChange(key) {
    this.setState({ activeKey: [key[1]] });
  }

  dateChange = (val) => {
    try {
      axios.post("https://api.trulylittlethings.com/exhibition_time-api", { date: val.format("YYYY-MM-DD") })
        .then((response) => {
          const filterArray = (value) => {
            for (var i = 0; i < response.data.item.length; i++) {
              if (response.data.item[i] === value) {
                return false;
              }
            }
            return true;
          }
          this.setState({ selectDate: val.format("YYYY-MM-DD") });
          this.setState({ selectTime: 0 });
          this.setState({ time: time.filter(filterArray) });
          this.setState({ disabled: [false, false, true, true] });
          this.setState({ activeKey: ['2'] });
          this.setState({ selectTicket: 1 });
        });
    }
    catch (err) {

    }
  }

  render() {
    return (
      <div>
        <Head>
      <title>TrulyLittleThings | Exhibition</title>
      </Head>
        <Slider previousButton={null} nextButton={null} autoplay={2000} classNames={horizontalCss}>
          {content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{ background: `url('${item.image}') no-repeat center center` }}
            >

            </div>
          ))}
        </Slider>

        <div style={{ width: "80%", margin: "auto" }}><br/>
          <h2>預約到訪小籽隨意門</h2><br />
          <div style={{ fontSize: "15px" }}>
          <div class="video-container">
          <iframe style={{maxWidth:"100%"}} width="560" height="315"   src="https://www.youtube.com/embed/C1NBmiZMJp0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>小籽是共享創作平台，透過與不同單位協作的創作項目，為香港人帶來一點空間，重整一下再走下去。<br/>首個項目名為「打開隨意門」體驗館，公開招募中找到四位年輕設計師合作，透過四個不同主題展館，包括「被困」、「毋忘」、「看見」、「待續」，一趟約30分鐘的重整旅程。盼望成為大家能尋回自己的隨意門，堅強走未完的路。<br/><br/>設有旅程後導師帶領分享活動，歡迎團體預約，４人成團，如需要請一星期前與我們聯絡。<br/><br/>對象：香港人<br/>門票: $50元/位 (收益10%作支持「石牆花工作」)<br/>包括: 小玻璃瓶乙個, 心意卡乙張<br/>如需免費活動導賞需預約時提出。導賞環節約30分鐘。<br/><br/>收到預約後我們會與你聯絡。多謝支持。<br/><br/>另設專業輔導導師/ 靈修指導導師帶領分享活動, 歡迎團體預約。<br/>費用: 每位HKD150 (6位起)</p>
         </div>
          </div>
          <br />
          {
              this.state.finish === false ?
                <Collapse activeKey={this.state.activeKey} onChange={(key) => this.collapseChange(key)}>
                  <Panel header="Reservation date" key="1">
                    <p><DatePicker allowClear={false} disabledDate={this.disabledDate} onChange={(value) => this.dateChange(value)} /></p>
                  </Panel>
                  <Panel header="Reservation time" key="2" disabled={this.state.disabled[1]}>
                    
                    <Radio.Group onChange={this.timeChange} value={this.state.selectTime}>
                      {
                        this.state.time.filter(time => time >= 12).map((arr, index, { length }) => {
                            return (
                              <Radio style={radioStyle} value={arr}>
                                {arr + ":00 - " + (arr) + ":45"}
                              </Radio>)
                          })}

                    </Radio.Group>
                  </Panel>

                  <Panel header="Number of Visitor(s)" key="3" disabled={this.state.disabled[2]}>
                  <Form.Item  validateStatus={this.state.validateStatus.status} help={this.state.validateStatus.help}>
                  <InputNumber size="large" min={1} max={30 - this.state.ticketNumber} defaultValue={this.state.selectTicket} value={this.state.selectTicket} onChange={this.onChange} /> 
                      </Form.Item>
                  </Panel>

                  <Panel header="Contact details (for confirmation use)" key="4" disabled={this.state.disabled[3]}>
                    <Form onFinish={this.finishForm} >
                      <Form.Item name={"Name"} label="Name" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name={'Email'} label="Email" rules={[{ type: 'email', required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name={'Phone'} label="Phone" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item >
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>
                          Submit
              </Button>
                      </Form.Item>
                    </Form>
                  </Panel>
                </Collapse> : <Result
                  status="success"
                  title="Successfully Book"
                  subTitle="Please simply check your inbox to complete your booking."
                />}<br /><br /><br /></div></div>
    )
  }
}
export default showroom;