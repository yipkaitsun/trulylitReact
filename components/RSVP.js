import React, { Component } from 'react';
import { Table, Input, Button, Space, Modal } from 'antd';
import axios from "axios";
import { SearchOutlined } from '@ant-design/icons';
import SetRsvp from '../components/setRSVP';

class RSVP extends Component {

    constructor(props) {
        super(props);
        this.loadData();
        this.state = {
            id: 0,
            result: false,
            dataSource: [],
            searchText: '',
            searchedColumn: '',
            visible: false,
            renderform: null,
        }
    }


    handleOk = e => {

        this.setState({
            visible: false,
            renderform: null,

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
        render: text => (text),
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
        axios.post("https://trulylittlethings.herokuapp.com/loadRSVP-api", { function: "loadId", id: id })
            .then((response) => {
                console.log(response.data);
                this.setState(
                    {
                        visible: true, renderform: <SetRsvp id={id} status={response.data.event.status} remark={response.data.event.remark} finish={this.loadData} />
                    })
            })

    }


    loadData = () => {
        axios.post("https://trulylittlethings.herokuapp.com/loadRSVP-api", { function: "loadAll" }
        ).then((response) => {
            console.log(response)
            this.setState({ dataSource: response.data.dataSource });

        })
    }
    render() {
        const columns = [

            {
                title: 'User',
                dataIndex: 'User_email',
                key: 'User_email',
                ...this.getColumnSearchProps('User_email')
            },
            {
                title: 'Email',
                dataIndex: 'contact_email',
                key: 'contact_email',
                ...this.getColumnSearchProps('contact_email')
            },
           {
                title: 'Phone',
                   dataIndex: 'contact_phone',
                   key: 'contact_phone',
                   ...this.getColumnSearchProps('contact_phone')
            },

            {
                title: 'Class',
                dataIndex: 'class',
                key: 'class',
                   ...this.getColumnSearchProps('class')
            },
             {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                 key: 'status',
                 ...this.getColumnSearchProps('status')
            },
            {
                title: 'Remark',
                dataIndex: 'remark',
                 key: 'reamrk'
            },

        ];
        return (
            <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                <Table dataSource={this.state.dataSource} columns={columns} onRow={(record, rowIndex) => { return { onDoubleClick: () => { this.showModal(record.key) } } }} />;

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

export default RSVP