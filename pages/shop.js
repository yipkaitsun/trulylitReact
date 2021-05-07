import Head from 'next/head';
import React, { Component } from 'react';
import PageIndicator from '../components/pageIndicator';
import Search from '../components/search';
import CatImg from '../components/shopcat_img';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ScrollTo } from "react-scroll-to";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import {  Select, Spin,Popover, Button,Affix,message,Pagination} from 'antd';
import {FilterOutlined } from '@ant-design/icons';
import Slider from 'react-animated-slider';
import '../styles/slider.css';
import horizontalCss from '../styles/horizontal.css';
import '../styles/app.css'


class shop extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
       showData:[],
      data: [],
      category:[],
      loading: false,
      select:[],
      choosedcat:[],
      shopcatclass:[],
      brand:[] ,
      choosebrand:[],
      visible: false,
      count:0,
        page: 1,
      banner:[],

    }
    this.loadData();


  }

   slideImages = [
  
  ];
  
    loadData() {
        axios.post("https://api.trulylittlethings.com/shop-api"
        ).then((response) => {
            axios.post("https://trulylittlethings.herokuapp.com/loadPage-api", { function: "loadPage", page: "shop" }
            ).then((banner) => {
                var tempshopcatclass = [];
                for (var i = 0; i < response.data.select.length; i++) {
                    tempshopcatclass.push("article-image");
                }
                this.setState({ banner: banner.data.slider, page: 1, loading: false, data: response.data.product, category: response.data.category, select: response.data.select, shopcatclass: tempshopcatclass, brand: response.data.brand, count: response.data.product.length }, () => { this.loadPage(1) });
            })
        })
    }
     
  loadPage(page){
    this.setState({showData:this.state.data.slice( (page-1)*12, ((page-1)*12)+12)},()=>{this.loading(false)});

  }
  loading=(flag)=>{
  this.setState({loading:flag});
  }
  choosecat(id,index){
  this.smoothScrollDown(window.scrollY);
    var tempselect=this.state.select.slice() ;
    var tempchoosedcat=this.state.choosedcat.slice() ;
    var tempshopcatclass=this.state.shopcatclass.slice() ;
    tempselect[index]=!this.state.select[index]
    
    if (tempselect[index]==true){
        tempchoosedcat.push(id);
        tempshopcatclass[index]="article-image article-image-active";
        message.info("選取");
    }
    else{
      message.info("取消選取");
      tempchoosedcat=tempchoosedcat.filter(value => value!==id);
      tempshopcatclass[index]="article-image";
    }
   this.setState({select:tempselect,choosedcat:tempchoosedcat,shopcatclass:tempshopcatclass})

    axios.post("https://api.trulylittlethings.com/shop_category-api",{category:tempchoosedcat}
    ).then((response) => {
      var uniquearray=[]
      this.state.choosebrand.filter(function(item, index) {
        if (response.data.brand.indexOf(item) !== -1)
        uniquearray.push(item)
      });
    
      this.setState({ loading: false });
      this.setState({page:1, data: response.data.product,brand:response.data.brand,choosebrand:uniquearray,count:response.data.product.length },()=>{this.loadPage(1)});
    })
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleChange=value=> {
    var uniquearray=[]
    value.filter(function(item, index) {
      if (value.indexOf(item) == index)
      uniquearray.push(item)
    });
    this.setState({choosebrand:uniquearray})
 
  }
 
   smoothScrollUp = (h) => {
   console.log(h);
  let i = h ;
  if (i > 1000) {
    setTimeout(() => {
      window.scrollTo(0, i);
      this.smoothScrollUp(i - 30);
    }, 1);
  }
}

   smoothScrollDown = (h) => {

  let i = h ;
  if (i < 1000) {
    setTimeout(() => {
      window.scrollTo(0, i);
      this.smoothScrollDown(i + 15);
    }, 1);
  }
}

  onPageChange = (page, pageSize)=> {
    this.smoothScrollUp(window.scrollY );
    this.setState({loading:true});    
    this.loadPage(page);
    this.setState({page:page})
 
  }

  handleblur=()=>{
    axios.post("https://api.trulylittlethings.com/shop_brand-api",{category:this.state.choosedcat,brand:this.state.choosebrand}
    ).then((response) => {
  
      this.setState({ page:1,data: response.data.product,loading:false,count:response.data.product.length},()=>{this.loadPage(1)});
    })
  }
  
  render() {
    return (

      <div className="recreation-page" style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
          <Head>
        <title>TrulyLittleThings | Shop</title>
      </Head>
        <PageIndicator>商店</PageIndicator><br />
        <Slider previousButton={null} nextButton={null} autoplay={2000} classNames={horizontalCss}>
        {this.state.banner.map((item, index) => (
          <div 
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` }}
          >
           <div className="inner" style={{top:"65%"}}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
         <br /><br />
        <div className="recreation-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <strong><p>Purchasing Method:</p>
        <p>Paypal/ Visa/ MasterCard available (Only applicable on purchase over $500) For Order below $500, FPS/ Payme are welcome, please contact 63130460 for payment details.</p></strong>
        <Row xs={2} lg={3}>
          {
            this.state.category.map((item,index)=>(
              <Col className="shop_cat_col">
              <div onClick={()=>{this.choosecat(item.id,index)}}>
              <CatImg class={this.state.shopcatclass[index]} text={item.name} img={item.image} select={this.state.select[index]}/>
              </div>
              </Col>
            ))
          }
     
            
        </Row>
       
        <div id="product"  style={{ textAlign: "right" }}><br />
        <Search product={this.state.data} /><br/>
        <Affix offsetBottom={60} style={{ position: 'fixed', bottom: 60, right: "3.5vw" , zIndex:5 }}>

          
        <Popover 
         placement="left" 
       title="Filter Brand"
    content={   
     <Select
     dropdownAlign={{
      points: ['bl', 'tl'], 
      offset: [0, -4], 
       overflow: {
         adjustX: 0, 
         adjustY: 0,
     },
   }}
   listItemHeight={10} listHeight={250}
     getPopupContainer={triggerNode => triggerNode.parentNode}
     maxTagCount={1}
     showSearch={false}
     onBlur={this.handleblur}
    value={this.state.choosebrand}
    onChange={this.handleChange} 
    mode="multiple"
    showArrow
    style={{ width: '100%' }}
    options={this.state.brand}

  /> }
  
  trigger="click"
  visible={this.state.visible}
  onVisibleChange={this.handleVisibleChange}
>
  <Button  size="large" shape="circle" icon={<FilterOutlined />} />
</Popover></Affix>
        </div>
        <hr />

        <div  style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
            {this.state.loading==true?<Spin size="large" />:
            <Row xs={1} sm={3} md={3} lg={4}>
              {this.state.showData.map((val, index) => {
                var product = index;
                return (<div key={"cat" + product} >
                  <Col key={"product" + index} style={{ paddingBottom: 20, height: "100%" }}>
                    <Card style={{ width: '100%', height: "100%" }} className="ActivityCard">

                      <Card.Body className="ActivityCardBody">
                        <a href={"./product.html?id=" + val.id}><Card.Title style={{ textAlign: "center" }}>{val.name}</Card.Title></a>

                        <Card.Text className="cardPrice" style={{ fontSize: 18, color: "black", textAlign: "center",paddingBottom:"10px" }}>
                          ${val.price}</Card.Text>
                      </Card.Body>
                      <a href={"./product.html?id=" + val.id}><Card.Img variant="top" src={val.image} /></a>
                    </Card>
                  </Col>
                </div>
                )
              })
              }

            </Row>}
           
        </div>
        
        <Pagination  pageSize={12} showSizeChanger={false} onChange={this.onPageChange} total={this.state.count} current={this.state.page} /><div style={{paddingBottom:"100px"}}/>
       </div>
      </div>
    )
  }
}
export default shop;