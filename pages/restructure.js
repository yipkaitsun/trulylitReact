import Head from 'next/head';
import React, { Component } from 'react';
import '../styles/app.css'
import Cookies from 'universal-cookie';
import { Collapse,DatePicker,Radio,Select,Form,Input,Button,Result} from 'antd';
import axios from "axios";
const { Option } = Select;
const { Panel } = Collapse;
import { Markup } from 'interweave';
import Slider from 'react-animated-slider';
import '../styles/slider.css';
import horizontalCss from '../styles/horizontal.css';

const radioStyle = {
display: 'block',
height: '30px',
lineHeight: '30px',
};
const time=[11,12,13,14,15,16,17,18,19,20];
const cookies = new Cookies();
class restructure extends Component {
   
    constructor(props){
        super(props);    
        this.state={
          meridiem:"AM",
          selectDate:"",
          activeKey:['1'],
          time:[],
          selectTime:0,
          disabled:[false,true,true],
          email:"",
          name:"",
          finish:false,
            loading: false,
            banner: [],
          content:"",
        }
        axios.post("https://trulylittlethings.herokuapp.com/loadPage-api", { function: "loadPage", page: "restructure" }
        ).then((load) => {
            this.setState({banner:load.data.slider,content:load.data.content})
        })

    }
    finishForm= (val)=>{
      this.setState({loading:true});
      try{ 
    
        axios.post("https://api.trulylittlethings.com/appointment-api",{date:this.state.selectDate,time:this.state.selectTime,email:val.Email,name:val.Name})
            .then((response) => {
          const filterArray=(value)=> {
            for (var i=0;i<response.data.item.length;i++){
                if(response.data.item[i]===value){
                 return false;      
               }
           }
           return true;
           }
   
        this.setState({finish:response.data.result,loading:false});

        
        
      });
  

      }
      catch(err){

      }
      
    }
    meridiemChange=(val)=>{
      this.setState({meridiem:val});
      this.setState({selectTime:0});
      this.setState({disabled:[false,false,true]})

    }
    timeChange = e => {
      this.setState({selectTime:e.target.value})
      this.setState({disabled:[false,false,false]})
      this.setState({activeKey:['3']});
    };

    collapseChange(key) {
      this.setState({activeKey:[key[1]]});
    }
    
    dateChange= (val)=>{
     try{
      axios.post("https://api.trulylittlethings.com/appointment_time-api",{date:val.format("YYYY-MM-DD")})
      .then( (response) =>{

        const filterArray=(value)=> {
          for (var i=0;i<response.data.item.length;i++){
              if(response.data.item[i]===value){
               return false;      
             }
         }
         return true;
         }
        this.setState({selectDate:val.format("YYYY-MM-DD")});
        this.setState({selectTime:0});
        this.setState({time:time.filter(filterArray)});
        this.setState({disabled:[false,false,true]});
        this.setState({activeKey:['2']});
      
    });
}
      catch(err){
          
        }
      }
 
    render() {
   
     
    return (
      <div style={{width:"100%",margin:"auto"}}>
          <Head>
        <title>TrulyLittleThings | Restructure</title>
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
                        </div>
                    </div>
                ))}
            </Slider><br/>

            <div style={{ width: "80%", margin: "auto" }}>
    <h2>#Restructure 重整</h2>
            <div style={{ fontSize: "15px" }}>
                <Markup content={this.state.content}/>
    </div>
    <br/>
      {(this.state.finish===false)?
    <Collapse activeKey={this.state.activeKey}  onChange={(key)=>this.collapseChange(key)}>
        <Panel header="Choose an avaliable day for your appointment" key="1">
          <p><DatePicker allowClear={false} onChange={(value)=>this.dateChange(value)} /></p>
        </Panel>
        <Panel header="Choose an avaliable time for your appointment" key="2" disabled={this.state.disabled[1]}>
        <Select defaultValue="AM" style={{ width: 120 }}    onSelect={(value) => this.meridiemChange(value)} >
      <Option value="AM">A.M</Option>
      <Option value="PM">P.M</Option>
    </Select><br/>

    <Radio.Group onChange={this.timeChange} value={this.state.selectTime}>

     {
    
     this.state.meridiem==="AM" ?
     this.state.time.filter(time => time <12).map((arr,index,{length})=>{
        return(
          <Radio style={radioStyle} value={arr}>
          {arr+":00 - "+ (arr+1)+":00"}
        </Radio>)
 }) : this.state.time.filter(time => time >=12).map((arr,index,{length})=>{
  return(
    <Radio style={radioStyle} value={arr}>
    {arr+":00 - "+ (arr+1)+":00"}
  </Radio>)
})} 
      
       </Radio.Group>
        </Panel>
        <Panel header="Share your contact information with hus and we'll send you a reminder" key="3" disabled={this.state.disabled[2]}>
          <Form  onFinish={this.finishForm} >
            <Form.Item name={"Name"} label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'Email'} label="Email" rules={[{ type: 'email',required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" loading={this.state.loading}>
                Submit
              </Button>
            </Form.Item>
    </Form>
        </Panel>
      </Collapse>:  <Result
    status="success"
    title="Successfully Booking"
   
                    />}<br /><br /><br /></div>
            </div>
    )
  }
}
export default restructure;