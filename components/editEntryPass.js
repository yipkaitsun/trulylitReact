import React, { Component } from 'react';
import { Table, Input, Button, Space, Modal } from 'antd';
import axios from "axios";
import EditEntryPassForm from '../components/editEntryPassForm';

class editPass extends Component {

  constructor(props) {
      super(props);
    this.loadData();
    this.state = {
     id:0,
    result:false,
    dataSource:[],
    searchText: '',
    searchedColumn: '',
    visible: false,
    renderform:null,
    }
  } 


    handleOk = e => {
        
        this.setState({
            visible: false,
            renderform:null,
          
        });
      };
    
    handleCancel = e => {
        
        this.setState({
          visible: false,
            renderform: null,      
        });
      };


  

  showModal = (id) => {
      axios.post("https://trulylittlethings.herokuapp.com/entryPass-api", { function: "loadPass", id: id })
        .then((response) =>
        {
            var passtype = "monthly";
            var launch = false;
            var hoursNum = undefined;
            if (response.data.pass.valid == 'Y') launch = true;
            if (response.data.pass.hours_pass == "Y") passtype = "hours"
            if (response.data.pass.hours !== null) hoursNum = response.data.pass.hours;

            
        this.setState(
            {

                visible: true, renderform: <EditEntryPassForm id={id} passtype={passtype} launch={launch} hoursNum={hoursNum} productId={ response.data.pass.ProductID} finish={this.loadData} />
            })
        })
    }


    loadData = () => {
        axios.post("https://trulylittlethings.herokuapp.com/entryPass-api", { function: "loadAllPass" }
            ).then((response) => {
                this.setState({ dataSource: response.data.dataSource });
            })
        }
        render() {
            const columns = [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },

            ];
            return (
                <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                    <Table dataSource={this.state.dataSource} columns={columns} onRow={(record, rowIndex) => { return { onDoubleClick: () => { this.showModal(record.id) } } }} />;

                     <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
                    >
                        {this.state.renderform}

                    </Modal>
                </div>

            )
        }
    }

export default editPass