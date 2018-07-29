import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import { Route,Link,Redirect} from 'react-router-dom'
import Trunk from './Trunk/Trunk.jsx';
import Mysocket from './Socket/Socket.jsx'

// import LOGO_IMG from '../resource/img/logo.png'
const {Header, Content, Footer, Sider} = Layout;
import './app.css'
class RootComponent extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Sider
                        collapsible={false}
                    >
                        <div className="logo">
                          <img src={require('../resource/img/logo.png')} alt="logo" />
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to="/trunk">
                                <Icon type="appstore" />
                                <span className="nav-text">
                                  串口称重配置
                                </span>
                                </Link>
                            </Menu.Item>
                            
                            {/* <Menu.Item key="2">
                                <Link to="/mysocket">
                                <Icon type="exception" />
                                <span className="nav-text">nav 2</span>
                                </Link>
                            </Menu.Item> */}
                            {/* <Menu.Item key="3">
                                <Icon type="upload"/>
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="user"/>
                                <span className="nav-text">nav 4</span>
                            </Menu.Item> */}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header
                            style={{
                            background: '#fff',
                            padding: 0
                        }}>
                                <div className="trunk_title">串口称重配置</div>
                        </Header>
                        <Content
                            style={{
                            margin: '24px 16px 0'
                        }}>
                            <div
                                style={{
                                padding: 10,
                                // minHeight: 360
                                minWidth:400
                            }}>

                                <div className="content_wrapper">
                                      <Redirect from="/" to="/trunk"></Redirect>   
                                      <Route path="/trunk" component={Trunk} />
                                      {/* <Route path='/mysocket' component={Mysocket}/> */}
                                </div>

                            </div>
                        </Content>
                        <Footer
                            style={{
                            textAlign: 'center'
                        }}>
                         版权所有 © 2018 上海快仓智能科技有限公司  
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default RootComponent;