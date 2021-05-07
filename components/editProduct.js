import React, { Component } from 'react';
import { Table,Switch ,Input, Button, Space,Modal,Steps } from 'antd';
import axios from "axios";
import { LoadingOutlined, PlusOutlined,MinusCircleOutlined,SendOutlined,SearchOutlined} from '@ant-design/icons';
import InputProduct from './editInputProduct';
import SelectImage from './selectImage';
import AddImage from './addImage';
const { Step } = Steps;

class EditProduct extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.loadData();
    this.state = {
    selectImage:[],
    detailImage:[],
    input:[],
    result:false,
    allData:[],
    allCategory:[],
    categoryID:[],
    dataSource:[],
    detailEdit:{},
    loading: false,
    loading2:false,
    switchLaunch:[],
    searchText: '',
    searchedColumn: '',
    visible:false,
    stepcur:["block","none","none","none"],
    current: 0,
    step:[ ],
    editid:null
    }
  } 

   onChangeStep = current => {
   
    this.setState({ current });
    var tempstepcur=[];
    for(var i=0;i<this.state.stepcur.length;i++){
       if (i==current){tempstepcur[i]="block"}
       else{tempstepcur[i]="none"}
  
    }
   
    this.setState({stepcur:tempstepcur})

  };

    handleOk = e => {
        
        this.setState({
          visible: false,
          step:[],
          
        });
      };
    
    handleCancel = e => {
        
        this.setState({
          visible: false,
          step:[],
         
        });
      };
   handleSwitchChange=(key,id,checked)=>{
   
   this.setState({loading:true});
    axios.post("https://trulylittlethings.herokuapp.com/setProductLaunch-api",{id:id,launch:checked}
    ).then((response) => {
    if (response.data.result===true){
    this.state.switchLaunch[key]=response.data.switch;
    this.setState({switchLaunch:this.state.switchLaunch,loading:false})
        }

      else{
        this.state.switchLaunch[key]=!checked;
        this.setState({switchLaunch:this.state.switchLaunch,loading:false})
        }
    })
  }

   selectImage = (item) => {

       this.setState({selectImage: item})
   }

     selectDetailImage = (item) => {

       this.setState({detailImage: item})
   }

     onInputFinish = (item) => {
  
        this.onChangeStep(2)
        this.setState({input: item})
   }
    onSubmit = () => {
        this.setState({loading2:true})
       axios.post("https://trulylittlethings.herokuapp.com/editProduct-api",{input:this.state.input,selectImage:this.state.selectImage,detailImage:this.state. detailImage,id:this.state.editid})
            .then( (response) =>{  
              this.setState({loading2:false})
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

    showModal = (record) => {
        axios.post("https://trulylittlethings.herokuapp.com/loadAllProduct-api", { function: "loadProduct",id:record.id }
        ).then((response) => {
            var tempcat = []
            response.data.category.forEach(catecory => {
               tempcat.push(catecory.catid)
            })
            this.setState({
                visible: true, editid: record.id, selectImage: response.data.product.image, detailImage: JSON.parse(response.data.product.product_image), detailEdit: response.data.product, step: [<AddImage src="productphoto" ratio={1} />, <InputProduct ref={this.child} defaultCatValue={tempcat} defaultValue={response.data.product} onFinish={this.onInputFinish} />, <SelectImage type='radio' defaultValue={[response.data.product.image]} dir="productphoto" selectImage={this.selectImage} />, <SelectImage defaultValue={JSON.parse(response.data.product.product_image)} type='checkbox' dir="productphoto" selectImage={this.selectDetailImage} />]
            })
        })
       }

  loadData=()=>{
      axios.post("https://trulylittlethings.herokuapp.com/loadAllProduct-api", {function:"loadAll"}
    ).then((response) => {

    
    var dataSource=[];
    var switchLaunch=[];
    for (var i=0;i<response.data.product.length;i++){
        if (response.data.product[i].market_item===0){
          dataSource.push({
          key: i,
          id: response.data.product[i].id,
          name: response.data.product[i].name,
          tag: JSON.parse(response.data.product[i].tag)
        })
        switchLaunch.push(true);
        
        }
        else{
          dataSource.push({
          key: i,
          id: response.data.product[i].id,
          name: response.data.product[i].name, 
          tag: JSON.parse(response.data.product[i].tag).join(", ")
        })
        switchLaunch.push(false);
        }
        }
        console.log(dataSource);
        this.setState({
            dataSource: dataSource, switchLaunch: switchLaunch
        });
  
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
  {
    title: 'Launch',
    dataIndex: 'launch', 
    key: 'launch',
    render: (e, record) => (< Switch onChange={() => this.handleSwitchChange(record.key,record.id,!this.state.switchLaunch[record.key])} loading={this.state.loading} checked={this.state.switchLaunch[record.key]} />)
  },  {
    title: 'Tag',
    dataIndex: 'tag', 
    key: 'tag',
    ...this.getColumnSearchProps('tag')
    },
];
      return (
       
      <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
         <Table dataSource={this.state.dataSource} columns={columns} onRow={(record, rowIndex) => {return { onDoubleClick:()=>{this.showModal(record)},};}} />;
   
        <Modal
          title={this.state.detailEdit.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
      {this.state.current==3?<div style={{textAlign: 'right'}}> <Button loading={this.state.loading2} onClick={this.onSubmit} type="primary" type="dashed" icon={<SendOutlined />} danger size={"default"} >Sumbit</Button></div>:null}
        <Steps
          type="navigation"
          size="small"
          current={this.state.current}
          onChange={this.state.current!==1?this.onChangeStep:null}
          className="site-navigation-steps"
        >
          <Step
            title="Upload Photo"
            status="process"
          />
          <Step
            title="Input Detail"
            status="process"
          />
          <Step
            title="Thumbnails"
            status="process"
          />
           <Step
            title="Detail Image"
            status="process"
          />
        </Steps>
        <br/>
       {this.state.step.map((arr, index, { length }) => (<div style={{display:this.state.stepcur[index]}}>{arr}</div>))}
        </Modal>
      </div>

    )
  }
}
export default EditProduct;