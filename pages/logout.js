import React, { Component } from 'react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class logout extends Component {

    constructor(props){
        super(props);

        
       
    }
    
    render() {
        cookies.remove('refresh_token');
        cookies.remove('access_token');
        if (typeof window !== "undefined") {
            window.location.href = '/'; 
          }       
       
          
    return (
       <div className="loginform">
   
                </div>  
                                
    )
  }
}
export default logout;