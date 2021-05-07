import React, { Component } from 'react';
import { Table,Button,Input, Space  } from 'antd';
import axios from "axios";
import {ReloadOutlined,SearchOutlined } from '@ant-design/icons';

class SelectImage extends Component {

  constructor(props) {
    super(props);
    this.loadImage();
    this.state = {
        data:[],
        searchText: '',
        searchedColumn: '',
        selectedRowkey:[]
    }
  }

   onSelectChange = selectedRowKeys => {
   this.setState({selectedRowkey:selectedRowKeys})
   this.props.selectImage(selectedRowKeys);
  };
  
 loadImage = () => {
     axios.post("https://trulylittlethings.herokuapp.com/loadImage-api",{dir:this.props.dir})
        .then( (response) =>{  
 
var templist=response.data.imagelist;
var imagelist=[];
for (let i = 0; i <templist.length; i++) {
  imagelist.push({
    key: templist[i],
    image: <img style={{width:"100px"}} src={templist[i]}/>,
    name:templist[i]
   
  });
}
    this.setState({data:imagelist,selectedRowkey:this.props.defaultValue})
        })
      }

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
  render() {
  const columns = [
  {
    title: '',
    dataIndex: 'image',
  },
  {
     title: '',
    dataIndex: 'name',
    key: 'name',
     ...this.getColumnSearchProps('name')
  },
];

    const rowSelection = {
      onChange: this.onSelectChange,
      type: this.props.type,
      selectedRowKeys:this.state.selectedRowkey
    };
    return (
      <div className="price-page" style={{ marginLeft: "auto", marginRight: "auto" }}>
      <Button onClick={this.loadImage}><ReloadOutlined />Refresh</Button><br/><br/>
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
      </div>

    )
  }
}
export default SelectImage;