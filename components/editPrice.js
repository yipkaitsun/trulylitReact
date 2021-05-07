import React, { Component } from 'react';
import { Table, Input, Button, Space, Modal } from 'antd';
import axios from "axios";
import EditPriceForm from '../components/editPriceForm';

class editPrice extends Component {

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
    axios.post("https://trulylittlethings.herokuapp.com/price-api", { function: "loadPrice", id: id })
        .then((response) =>
        {
        this.setState(
            {
                visible: true, renderform: <EditPriceForm id={id} name={response.data.price.name} price={response.data.price.price} info={response.data.price.info} finish={this.loadData} />
            })
        })
    }


    loadData = () => {
        axios.post("https://trulylittlethings.herokuapp.com/price-api", { function: "loadAllPrice" }
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

export default editPrice