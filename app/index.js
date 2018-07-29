import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import TableList from './component/TableList.jsx'
import RootComponent from './component/app.js';
import {  HashRouter as Router, Route, Switch , hashHistory,Redirect } from 'react-router-dom';
class IndexComponent extends React.Component {
    componentDidMount() {
        
        // const serialport = require('serialport')
        // const serialport = require("electron")
        //     .remote
        //     .require("serialport");
        // serialport.list((err, ports) => {
        //     console.log('ports====>>>>>>>>', ports);
        //     if (err) {
        //         document
        //             .getElementById('error')
        //             .textContent = err.message
        //         return
        //     } else {
        //         document
        //             .getElementById('error')
        //             .textContent = ''
        //     }
        //     if (ports.length === 0) {
        //         document
        //             .getElementById('error')
        //             .textContent = 'Noports discovered '
        //     }
        // })
    }
    render() {

        return (
            <div>

                {/* <TableList/> */}
                {/* <RootComponent/> */}

                <Router>
                        <Switch>
                        <Route  path="/" component={RootComponent}/>
                        </Switch>
                </Router>
            </div>
        )
    }
}
var oBox = document.getElementById("main");
ReactDOM.render(
    <IndexComponent/>, oBox)