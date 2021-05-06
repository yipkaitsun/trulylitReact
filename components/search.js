import React, { Component } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input, AutoComplete } from 'antd';

class Search extends Component {

    constructor(props){
        super(props);
        this.state={
            option:[],
        };
  
          this.renderItem = (name,price,image,id) => {
            return {
              value: name,
              label: ( 
                <div>
                <div style={{width:"20%",display:"inline-block"}}>
                <img style={{width:"100%",paddingRight:"10px"}}src={image}/>
                </div>
                <div style={{width:"65%",display:"inline-block"}}>
                  {name}<br/><h2>{"$ "+price}</h2> 
                  </div>
                  </div>
              ),
            };
          };
    }
    go=(value)=>{
        window.location.href="/product.html?id="+ value 
    }

    search=(input,options)=>{
        const result=[];
        outer:
        for (var i=0;i<options.length;i++){
            var name=options[i].name.toLowerCase();
            var e=input.target.value.toLowerCase();
            var nameLength=name.length;
            var inputLength=e.length;
        
            if (nameLength===0||inputLength===0||nameLength<inputLength){
                continue outer;
            }
            var endIndex=nameLength-inputLength;
        
            for(var j=0;j<endIndex+1;++j){
              if (name.substring(j,j+inputLength)==e){
               result.push(options[i]);
                continue outer
             }
            }
        }
        const arr=result.map((val,index)=>{
            return{
                value: val.id,
                label: ( 
                  <div>
                  <div style={{width:"20%",display:"inline-block"}}>
                  <img style={{width:"100%",paddingRight:"10px"}}src={val.image}/>
                  </div>
                  <div style={{width:"65%",display:"inline-block"}}>
                    {val.name}<br/>{"$ "+val.price} 
                    </div>
                    </div>
                ),
            }
        })
    this.setState({option:arr});
    }
    
    render() {
        const options=[];
        this.props.product.map((val,index)=>{
            options.push(
              {
                name:val.name, price:val.price,image:val.image,id:val.id
              });
        });

    return (
        <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        style={{
          width: 250,
        }}
        options={this.state.option}
        onSelect={(value)=>this.go(value)}
      >
        <Input.Search size="large" placeholder="Search" onChange={(e)=>this.search(e,options)} />
      </AutoComplete>
        )
    }
}
export default Search;