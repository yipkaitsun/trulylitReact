import React, { Component } from 'react';
import { Drawer, Button, Tree } from 'antd';
import { Menu } from 'antd';
import { SmileOutlined, UserAddOutlined, LoginOutlined, ShoppingOutlined, SettingOutlined, InstagramOutlined } from '@ant-design/icons';
import '../styles/app.css';
const { SubMenu } = Menu;
const { DirectoryTree } = Tree;
const centerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  fontSize: "16px"
};
const treeData = [
  {
    title: 'About 小籽',
    key: '0-0',
    isLeaf: false,
    children: [
      {
        title: 'About Us 關於我們',
        key: '/about.html',
        isLeaf: true,
      },
      {
        title: 'Price 收費',
        key: '/price.html',
        isLeaf: true,
      },
    ],
  },
  {
    title: 'NEWS 最新消息',
    key: '/news.html',
    isLeaf: true,
  },
  {
    title: ' SHOP 埋嚟揀',
    key: '/shop.html',
    isLeaf: true,

  },
  {
    title: 'Booking 預約',
    key: '0-4',
    isLeaf: false,
    children: [
      {
        title: 'Reboot 放空 ',
        key: '/reboot.html',
        isLeaf: true,
      },
      {
        title: 'Recreation 創作',
        key: '/recreation.html',
        isLeaf: true,
      },
      {
        title: ' Restructure 重整',
        key: '/restructure.html',
        isLeaf: true,
      },
    ],
  },
  {
    title: 'Profile 個人資料',
    key: '/profile.html',
    isLeaf: true,
  },
  {
    title: 'Logout 登出',
    key: '/logout.html',
    isLeaf: true,
  },
];
const onSelect = (keys, event) => {
  if (event.node.isLeaf === true) {
    window.location.href = keys[0];
  }
};
const onExpand = () => {

};
class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }
  showDrawer = () => {
    this.setState({ visible: true });

  };
  onClose = () => {
    this.setState({ visible: false });
  };
  handleClick = e => {
    console.log('click ', e);
  };
  render() {

    return (
      <div style={{ backgroundColor: "white" }}>
        <Drawer
          title="小籽"
          placement="left"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}

        >
          <DirectoryTree
            multiple
            autoExpandParent={false}
            showIcon={false}
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />

        </Drawer>
        <Button className="navBtn" style={{borderColor: "#e839390f", position: "absolute", transform: "translateY(50%)", left: 20 }}
          onClick={this.showDrawer}>=</Button >
        <a href="./cart.html"><Button style={{borderColor: "#e839390f", position: "absolute", transform: "translateY(50%)", right: 20 }}><ShoppingOutlined /></Button ></a>
        <div className="banner">
          <a href="./"><img src="https://www.trulylittlethings.com/wp-content/uploads/2019/02/20200626_title_工作區域-1.png" alt="banner" /></a>
        </div>
        <Menu style={centerStyle} onClick={this.handleClick} mode="horizontal">
          <SubMenu key="About" icon={<SmileOutlined />} title="ABOUT 小籽">
            <Menu.Item key="About"><a href="./about.html">ABOUT US 關於我們</a></Menu.Item>
            <Menu.Item key="Price"><a href="./price.html">PRICE 收費</a></Menu.Item>
          </SubMenu>
          <Menu.Item icon={<InstagramOutlined />} key="NEWS "><a href="./news.html">NEWS 最新消息</a></Menu.Item>
          <Menu.Item icon={<ShoppingOutlined />} key="Shop "><a href="./shop.html">SHOP 埋嚟揀</a></Menu.Item>
          <SubMenu key="Booking" icon={<SettingOutlined />} title="BOOKING 預約">
            <Menu.Item key="Reboot"><a href="./reboot.html">REBOOT 放空</a></Menu.Item>
            <Menu.Item key="Recreation"><a href="./recreation.html">RECREATION 創作</a></Menu.Item>
            <Menu.Item key="Restructure"><a href="./restructure.html">RESTRUCTURE 重整</a></Menu.Item>
          </SubMenu>
          <Menu.Item icon={<UserAddOutlined />} key="profile">
            <a href="./profile.html"> PROFILE 個人資料  </a>
          </Menu.Item>
          <Menu.Item icon={<LoginOutlined />} key="logout">
            <a href="./logout.html">LOGOUT 登出</a>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
export default header;