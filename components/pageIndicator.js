import React,{Component} from 'react';
import '../styles/app.css'
class PageIndicator extends Component{
    render(){
      return(
        <div className ="page-heading">
        <div className="row-fluid">
            <div className="span12 a-center">
              <h1 className="title">
                   <span>{this.props.children}</span>
              </h1>
            
          </div>
        </div>
      </div>
    )}
}

export default PageIndicator;
