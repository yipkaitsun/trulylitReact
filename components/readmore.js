import React, { Component } from 'react';


class Readmore extends Component {

    constructor(props){
        super(props);
        this.state={
            showmore:false,
        }
        
    }

 
showmore(){
    if(this.state.showmore===false){
        this.setState({showmore:true})
    }
    else{
        this.setState({showmore:false})
    }
}
    render() {
       
    return (
       <div>
           {String(this.props.info).length>50?
                this.state.showmore===false?
           <p style={{whiteSpace:"break-spaces",lineHeight:"2.3"}}>
               {String(this.props.info).substring(0,50)} <a style={{color:"#286DA8"}} onClick= {()=>this.showmore()}> ...read more </a>
           </p>
           :
           <p style={{whiteSpace:"break-spaces",lineHeight:"2.3"}}>
               {String(this.props.info)} <a style={{color:"#286DA8"}} onClick= {()=>this.showmore()}> read less</a>
           </p>
                :
                <p style={{whiteSpace:"break-spaces",lineHeight:"2.3"}}>
                {String(this.props.info)}</p>
                }
       </div>
    )}
  
  }

export default Readmore;