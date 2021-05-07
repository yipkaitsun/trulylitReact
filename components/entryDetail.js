import React, { Component } from 'react';
import { Table } from 'antd';
const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'In Time',
      dataIndex: 'inTime',
      key: 'inTime',
    },
    {
        title: 'Out Time',
        dataIndex: 'outTime',
        key: 'outTime',
      },
      {
        title: 'Spent Hours',
        dataIndex: 'hours',
        key: 'hours',
      },
    
  ];
class EntryDetail extends Component {

    constructor(props){
      
        super(props);
    
        console.log(this.props.detail[0]);
    }

    render() {
    
      

    return (
        <div>
    <Table dataSource={this.props.detail} columns={columns} />
      
     </div>
        )
    }
}
export default EntryDetail;