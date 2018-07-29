import React, {Component} from 'react';
import {
    Row,
    Col,
    Select,
    Input,
    Button,
    Table,
    Divider,
    Modal,
    Form,
    Icon,
    Checkbox
} from 'antd';
import './Trunk.css'
import { getItem,addData,removeData,requireTrunk,subSet,chectStatus,judgeOnline,selectTrunk,findWeightPort,findInstanceport} from '../../../util/access.js';
import { constants } from 'zlib';
const FormItem = Form.Item;
const Option = Select.Option;
// const serialport = require("electron").remote.require("serialport");
// import serport from 'serialport'
const serialport =global.require('serialport')

const server = require('http').createServer();

const io = require('socket.io')(server,{
    serveClient: false
});

// var io = require('socket.io')(server);
// const io = require('socket.io')(server);

server.listen(8081,function(){
    console.log("listener in port 8081")
  });

class Trunk extends Component {
    constructor(props){
        super(props)
        this.state = { 
            visible: false,
            data:[],
            trunk_list:[],
            trunkMsg:[],
            port1:{},
            protInstance:[],
            trunk_data:[]
         }
    }   

    // 显示模态框
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
      
    // 隐藏模态框
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }

    // 新增记录
    onCreate = () => {
        this.props.form.validateFields((err, values) => {
          if (err) {
            return;
          }
        console.log('Received values of form: ', values);
        const Data=values;
        addData(Data)
        this.renderData()
        this.filterTrunk()
        this.props.form.resetFields();
        this.setState({ visible: false });
        // 新增端口
        this.addPort(values.trunk_id)
        });  
    }

    addPort(port){
        let p = new serialport(port);
        p.on('data', (data) => {
            console.log('receive data====>>>>', data.toString())
        }),
        this.setState({
            protInstance:[...this.state.protInstance,p]
        })
    }


    // 获取data 数据
    renderData(){
            console.log("render_data",this.state.trunk_data)
          this.setState({
              data:chectStatus(this.state.trunk_data)
          })
    }

    // 删除data
    deleteData=(v)=>{
       let portIn=findInstanceport(this.state.protInstance,v.trunk_id)
       portIn.close((data)=>{
        console.log("close data===>>>",data)
        })
        let newportIn=this.state.protInstance.filter(v=>v!=portIn)
        this.setState({
            protInstance:newportIn
        })
        removeData(v.trunk_id);
        this.filterTrunk()
        this.renderData()
        // let closeTarge=this.state.protInstance
    }


    // 过滤已经选择的串口 
    filterTrunk=()=>{
        this.setState({
            trunk_list:selectTrunk(this.state.trunk_data)
        })
    }



    openPort=()=>{
        console.log(this.state.trunk_list)
        console.log('实例化serialport===>>>',this.state.protInstance)
        this.state.protInstance.map(v=>(

            v.on('data', (data) => {
                console.log('receive data====>>>>', data)
            }),
            v.open(err=>{
                if(err){
                    return console.log('Error opening port: ',err.message);
                }
            })
        ))
    }

    sendPort=(msg)=>{
        this.state.protInstance.map(v=>(
            v.write(msg, function (err) {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
                console.log('message written');
            })
        ))
    }

    sendMsgPort=(trunk_id,msg)=>{
    console.log("sendMsgPort,protInstance",this.state.protInstance);
    let target=this.state.protInstance.find(v=>v.path=trunk_id)
    if(typeof target==='object'){
        target.write(msg, function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        })
    }

      
    }


    closeTrunk(){
    //var _this=this;
    // serialport.list((err,ports)=>{
    //         // let path = ports[0].comName;
    //         // let myPort = new serialport(path);

    //         _this.state.port1.close((data)=>{
    //             console.log("close data===>>>",data)
    //         })
    //     })

    // this.myPort.close((data)=>{
    //             console.log("close data===>>>",data)
    //             })

    this.state.protInstance.map(v=>(
        v.close(data=>{
            console.log('close data===>>>',data)
        })
    ))
    }

    renderLocalPort(){
        // console.log('判断存取状态====>>',judgeOnline(this.state.trunk_data))
        let protInstance=[];
        let localArr=judgeOnline(this.state.trunk_data);
        localArr.map((v)=>{
            let p=new serialport(v);
            console.log('监听data',v)
            p.on('data', (data) => {
                console.log('receive data====>>>>', data.toString())
            })
            protInstance.push(p);
        })
        this.setState({
            protInstance
        })
    }

    componentDidMount(){
        const _this=this;
        io.on('connection', function (socket) { 
            console.log("连接成功")
            io.emit('news',{'status':'trunk__send_this'}); 
            io.emit('zsd',{'name':'jmh'}); 

            socket.on('data',(data)=>{
                console.log("socket___ data===>>>>",data)
                let res=JSON.parse(data)
                let weight_id=res.weight_id;
                let msg =res.directive
                let findObj=findWeightPort(weight_id);
                if (typeof findObj==='object' &&findObj.hasOwnProperty('trunk_id')){
                    _this.sendMsgPort(findObj.trunk_id,msg)
                }

            //  _this.sendPort(data)
            })
          
            // setInterval(() => {
            //   io.emit('news',{'status':'正确'}); 
            // }, 1000)
          
          })


      // 存取serialport 端口名
       serialport.list((err,ports)=>{
          let myseraport=[];
        //   let myseraport=['COM1','COM2','COM3','COM4'];
          ports.map(v=>(
              myseraport.push(v['comName'])
          ))
          this.setState({
              trunk_list:myseraport,
              trunk_data:myseraport
          },()=>{
            this.filterTrunk();
            this.renderData();
            this.renderLocalPort();
          })
       })

      
     
    }

    render() {   
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '串口标识',
                dataIndex: 'trunk_id',
                key: 'trunk_id'
            }, {
                title: '称重标识',
                dataIndex: 'weight_id',
                key: 'weight_id'
            },
            // {
            //     title:'波特率',
            //     dataIndex:'baud_rate',
            //     key:'baud_rate'
            // },
            {
                title:'状态',
                dataIndex:'status',
                key:'status' 
            },{
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                           <Button type="danger" onClick={()=>this.deleteData(record)}>删除</Button>
                    </span>
                )
            }
        ];

        return (
        
            <div className="trunk_wrapper">
                {/* <div className="trunk_title">串口称重配置</div> */}
                <div className="trunk_content">
                <div className="trunk_option">
                    <Button type="primary" icon="plus"  onClick={this.showModal}>新增配置</Button>
                    {/* <Button type="primary" onClick={this.openPort}>开启端口</Button>
                    <Button type="primary" onClick={this.closeTrunk.bind(this)}>关闭端口</Button>
                    <Button type="primary" onClick={this.sendPort}>发送数据</Button> */}
                    </div>
                    <div className="table_wrapper">
                        <Table dataSource={this.state.data} columns={columns}/>
                    </div>
        
                </div>
                <Modal
                    title="新增串口--称重标识"
                    visible={this.state.visible}
                    onOk={this.onCreate}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                    <Form layout="vertical">
                            <FormItem label="称重标识">
                                {getFieldDecorator('weight_id', {
                                    rules: [{ required: true, message: '请输入称重标识' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="串口标识">
                                {getFieldDecorator('trunk_id',{
                                      rules: [
                                        { required: true, message: '请选择串口' },
                                      ],
                                })(   
                                     <Select placeholder="请选择一个串口" >
                                            {
                                                this.state.trunk_list.map((item,index)=>(
                                                    <Option value={item} key={index}>{item}</Option>
                                                ))
                                            }
                                </Select>)}
                            </FormItem>
                            {/* <FormItem label="波特率">
                                {getFieldDecorator('baud_rate', {
                                    rules: [{ required: true, message: '请输入波特率' }],
                                })(
                                    <Input />
                                )}
                            </FormItem> */}
               </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

const FormWrapper= Form.create()(Trunk)
export default FormWrapper;