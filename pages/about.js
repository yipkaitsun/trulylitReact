import Head from 'next/head';
import React, { Component } from 'react';



class Price extends Component {

    
 
  render() {

    return (
      <div className="price-page" style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
        <Head>
        <title>TrulyLittleThings | About</title>
        </Head>
           <h2 style={{fontFamily:"fantasy",marginTop:"30px" , fontSize:"3rem"}}>  小籽是誰? </h2>
           <br/><p style={{marginBottom: "5rem"}}>
           Truly Little Things 小籽 是一個共享創作平台，即使生命中滿佈荊棘，卻是繞有意思的創作土釀，由微小的種籽開始。
持續創作，生命有力。#生命需要創作<br/><br/></p>
<h3 style={{fontFamily:"fantasy"}}> #放空 Reboot</h3>
<p  style={{marginBottom: "5rem"}}>致力提供創適空間及工具、供會員工作、溫習、創作、交流，並提供精選書藉、免費飲品小食、儲存空間等。</p><br/>
<h3 style={{fontFamily:"fantasy"}}> #創作 Recreation</h3>
<p  style={{marginBottom: "5rem"}}>提供共享實體寄賣店及線上網店，歡迎寄賣、開辦工作坊、講座、小組分享、展覽、賣物會、音樂會等，收費極具彈性，沒有按金要求，隨時預約，即時使用，全力支持創作及初創單位。</p><br/>

<h3 style={{fontFamily:"fantasy"}}>#重整 Restructure</h3>
<p  style={{marginBottom: "3rem"}}>舉辦不同課程及工作坊，以藝術、舒壓、情理兼備的課程供會員參與，透過體驗，重整，然後重新出發。</p>
<p>
開放時間:<br/>
星期一至六: 11:00-21:00<br/>
星期日需預約<br/><br/>

歡迎預約或查詢，歡迎聯絡，共商其他協作項目：<br/>
電話: 6313 0460<br/>
IG: trulylittlethings<br/>
地址: 葵涌金基工業大廈7C (葵興地鐵站A出口步行約5分鐘到)<br/>
</p>

        </div>
    )
  }
}
export default Price;