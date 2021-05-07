import React, { Component } from 'react';
import { Table,Modal } from 'antd';
import axios from "axios";
import Cookies from 'universal-cookie';
import EntryDetail from '../components/entryDetail';
import PageIndicator from '../components/pageIndicator';
const cookies = new Cookies();
const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
    
    },
   
  
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      width: '20%',
  
    },

    {
    title:'Price',
    dataIndex: 'price',
    key: 'price',
    width: '20%',
},
{
    title:'Remaining hours',
    dataIndex: 'hours',
    key: 'hours',
    width: '20%',
},
{
    title:'Expiry Date',
    dataIndex: 'expire',
    key: 'expire',
    width: '20%',
}
  
  ];

class Entry extends Component {

    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            visible:false,
            detail:[{ key:null,
                date:null,
                inTime:null,
                outTime:null,
                hours:null,
                expire:null}],
                plan:null
        }
     this.loadData();    
    }
    
    

    loadData() {

        axios.post("https://api.trulylittlethings.com/entryRecord-api", {access_token: cookies.get("access_token")  })
         .then((response) => {
            this.setState({ dataSource: response.data.item });
          });
      }

      showModal = (key) => {
        axios.post("https://api.trulylittlethings.com/entryRecordDetail-api", {access_token: cookies.get("access_token"),id:key  })
        .then((response) => {
            console.log(response.data.result)
           this.setState({ detail: response.data.result,visible: true,plan:response.data.plan });
         });
      }
      handleOk = e => {
        this.setState({
          visible: false,
          
        });
      };
    
      handleCancel = e => {
        this.setState({
          visible: false,
         
        });
      };
    render() {
        return (
            <div className="price-page" style={{marginLeft:"auto",marginRight:"auto"}}>
            <PageIndicator>入場紀錄</PageIndicator><br/>
               <Table className="tranansactionTable" columns={columns} dataSource={this.state.dataSource} onRow={(record, rowIndex) => {return { onClick:()=>{this.showModal(record.key)},};}}/>
  {this.state.detail!==[]?
<Modal
          title={this.state.plan}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
     
      <EntryDetail detail= {this.state.detail} />
        </Modal>:null
        }
            </div>
        )
    }
}
export default Entry;