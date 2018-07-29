import React from 'react';
import ReactDOM from 'react-dom';
// import  SerialPort  from 'serialport';
// import * as SerialPort  from 'serialport';
class MainContentComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
       
        // const serialport = require('serialport')

        // serialport.list((err, ports) => {
        //   console.log('ports', ports);
        //   if (err) {
        //     document.getElementById('error').textContent = err.message
        //     return
        //   } else {
        //     document.getElementById('error').textContent = ''
        //   }
        
        //   if (ports.length === 0) {
        //     document.getElementById('error').textContent = 'No ports discovered'
        //   }
    
        // })
        
    }
    render() {
        return (
            <div>
                hello,this is first demo
            BY_ZSD 更改后===>>tttttteeeeessstttt
            </div>
        );
    }
}

ReactDOM.render(
    <MainContentComponent/>,
    document.getElementById('main')
);


test(){
    // 引入serialport 模块
    var _this=this;
    serialport.list((err,ports)=>{
        console.log('seraprot_err===>>>',err);
        console.log('ports===>>',ports)
        let path = ports[0].comName;
        // let myPort = new serialport(path);
        _this.myPort = new serialport(path)

        // Open errors will be emitted as an error event
        _this.myPort.on('error', function (err) {
            console.log('Error: ', err.message);
        })
        // 当接收到数据时
        _this.myPort.on('data', (data) => {
            console.log('data====>>>>', data)
        });

        _this.myPort.write('123', function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });

        // myPort.on('open', (err) => {
        //     if(err){
        //         return console.log('Error opening port: ',err.message);
        //     }
        //     console.log('has open')
        //     myPort.write('123', function (err) {
        //         if (err) {
        //             return console.log('Error on write: ', err.message);
        //         }
        //         console.log('message written');
        //     });

        // });
    })
}



componentWillUnmount(){
    // console.log('unmount')
    // this.state.protInstance.map(v=>(
    //     v.close(data=>{
    //         console.log('close data===>>>',data)
    //     })
    // ))

    // const serialport = require("electron").remote.require("serialport");
    // serialport.list((err,ports)=>{
    //     let path = ports[0].comName;
    //     let myPort = new serialport(path);
    //     myPort.close((data)=>{
    //         console.log("close data===>>>",data)
    //     })
    // })

}


componentWillMount(){



    // // 引入serialport 模块
    // const serialport = require("electron").remote.require("serialport");
    // serialport.list((err,ports)=>{
    //     console.log('seraprot_err===>>>',err);
    //     console.log('ports===>>',ports)
    //     let path = ports[0].comName;
    //     let myPort = new serialport(path);

    //     // Open errors will be emitted as an error event
    //     myPort.on('error', function (err) {
    //         console.log('Error: ', err.message);
    //     })
    //     // 当接收到数据时
    //     myPort.on('data', (data) => {
    //         console.log('data====>>>>', data)
    //     });
    //     myPort.on('open', (err) => {
    //         if(err){
    //             return console.log('Error opening port: ',err.message);
    //         }
    //         console.log('has open')
    //         myPort.write('123', function (err) {
    //             if (err) {
    //                 return console.log('Error on write: ', err.message);
    //             }
    //             console.log('message written');
    //         });

    //     });
    //     let myseraport=[]
    //     ports.map(v=>(
    //         myseraport.push(v['comName'])
    //     ))

    //     this.setState({
    //         trunkMsg:ports,
    //         trunk_list:myseraport
    //     })
      
    // })
}

let u = [109, 97, 105, 110, 32, 115, 99, 114, 101, 101, 110, 32, 116, 117, 114, 110, 32, 111, 110]