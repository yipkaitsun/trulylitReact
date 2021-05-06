import Head from 'next/head';
import React,{Component} from 'react';
import { Menu,Layout,} from 'antd';
import locale from 'antd/lib/locale-provider/zh_HK';
import Cookies from 'universal-cookie';
import 'moment/locale/zh-hk';
import axios from 'axios';
import '../styles/app.css';
import AddProduct from '../components/addProduct';
import AddEventForm from '../components/addEventForm';
import EditProduct from '../components/editProduct';
import EditEvent from '../components/editEvent';
import Subtype from '../components/setSubtype';
import AddActivity from '../components/addActivity';
import EditActivity from '../components/editActicity';
import RSVP from '../components/RSVP';
import AddPrice from '../components/addPrice';
import EditPrice from '../components/editPrice';
import AddEntryPass from '../components/addEntryPass';
import EditEntryPass from '../components/editEntryPass';
import EditPage from '../components/editPage';
import UploadBanner from '../components/addImage';
const cookies = new Cookies();
const { SubMenu } = Menu;
const { Content,Sider } = Layout;
class Admin extends Component{
    
    constructor(props){
        super(props);

        this.state={
            admin: false,
            component: [<AddProduct />, <Subtype />, <EditProduct />, <AddEventForm />, <AddActivity />, <EditEvent />, <EditActivity />, <RSVP />, <AddPrice />, <EditPrice />, <AddEntryPass />, <EditEntryPass />, <UploadBanner src="banner" ratio={3/1}/>  , <EditPage />  ],
        menuSelect:<AddProduct/>,
        }
  
        axios.post("https://trulylittlethings.herokuapp.com/admin_auth-api",{token:cookies.get("access_token"),refresh:cookies.get("refresh_token")})
        .then( (response) =>{  
        console.log(response.data.statusCode);
        if (response.data.statusCode===200){
        this.setState({admin:true})
        }
        else{
        this.setState({admin:false})}
      });
      }
      
 handleClick = e => {
 this.setState({menuSelect:this.state.component[parseInt(e.key, 10)]})   
  };
 
  render(){
    return(
        <Layout>
         <Layout>
          <Sider
      style={{background:"white"}} >
         <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub1']}
        mode="inline"
                    >


                        <SubMenu key="sub1" title="Product">
                            <Menu.ItemGroup key="g1" title="">
                                <Menu.Item key="0">Add Product</Menu.Item>
                                <Menu.Item key="1">Specification</Menu.Item>
                                <Menu.Item key="2">Edit Product</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu key="sub2" title="Event">
                            <Menu.ItemGroup key="g2" title="">
                                <Menu.Item key="3">Add Application Form</Menu.Item>
                                <Menu.Item key="4">Add Activity</Menu.Item>
                                <Menu.Item key="5">Edit Application Form</Menu.Item>
                                <Menu.Item key="6">Edit Activity</Menu.Item>
                                <Menu.Item key="7">RSVP</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                            <SubMenu key="sub3" title="Price">
                                <Menu.ItemGroup key="g3" title="">
                                    <Menu.Item key="8">Add Price</Menu.Item>
                                    <Menu.Item key="9">Edi t Price</Menu.Item>
                                    <Menu.Item key="10">Add Entry Pass</Menu.Item>
                                    <Menu.Item key="11">Edit Entry Pass</Menu.Item>
                                    
                                  
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu key="sub4" title="Page">
                            <Menu.ItemGroup key="g4" title="">
                                <Menu.Item key="12">Upload Banner</Menu.Item>
                                <Menu.Item key="13">Edit Page</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
      </Menu>
     </Sider>
      <Content >
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
       {this.state.admin===true?this.state.menuSelect:
       <div>Not Admin</div>}
        </div>
      </Content>
  </Layout>
      </Layout>
    )
}
}
export default Admin;

