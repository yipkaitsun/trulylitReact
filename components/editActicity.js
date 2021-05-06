import React, { Component } from 'react';
import { Table, Input, Button, Space, Modal } from 'antd';
import axios from "axios";
import { SearchOutlined} from '@ant-design/icons';
import EditActivityForm from '../components/editActivityForm';

class editActivity extends Component {

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


    getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>(text),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  showModal = (id) => {
      axios.post("https://trulylittlethings.herokuapp.com/activity-api", { function: "loadActivity", id: id })
        .then((response) =>
        {
            console.log(response.data);
        this.setState(
            {
                visible: true, renderform: <EditActivityForm id={id} name={response.data.activity.name} description={response.data.activity.discription} image={response.data.activity.image} link={response.data.activity.link} />
            })
        })
      }


    loadData = () => {
        axios.post("https://trulylittlethings.herokuapp.com/activity-api", { function: "loadAllActivity" }
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
                    ...this.getColumnSearchProps('name')
                },

            ];
            return (
                <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                    <Table dataSource={this.state.dataSource} columns={columns} onRow={(record, rowIndex) => { return { onClick: () => { this.showModal(record.id) } } }} />;

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

export default editActivity