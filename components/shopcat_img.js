import React, { Component } from 'react';
import { ScrollTo } from "react-scroll-to";
class CatImg extends Component {

    constructor(props){
        super(props);
      }
  
     
    
    render() {
 
    
      var text=this.props.text.split(',');
    return (
        <div class="ar-image">
         
  <div   class={this.props.class} style={{backgroundImage: this.props.img}}> 
  <div>
  {
  text.map((val, index) => {
  return(<div style={{fontSize:"23px"}}>{val}</div>)
  })
   }
   </div>
  </div> 
</div>
    
        )
    }
}
export default CatImg;