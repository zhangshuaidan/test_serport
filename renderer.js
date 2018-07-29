// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const serialport = require('serialport')
// const createTable = require('data-table')

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

//   const headers = Object.keys(ports[0])
//   const table = createTable(headers)
//   tableHTML = ''
//   table.on('data', data => tableHTML += data)
//   table.on('end', () => document.getElementById('ports').innerHTML = tableHTML)
//   ports.forEach(port => table.write(port))
//   table.end();
// })
var server = require('http').createServer();
var io = require('socket.io')(server);


io.on('connection', function (socket) { 
  console.log("连接成功")
  io.emit('news',{'status':'正确'}); 
  // io.on('connect', function(data){
  //   console.log("news===>>>",data);
  // });
  io.emit('zsd',{'name':'张帅丹'}); 
  console.log(io)
  socket.on('news',function(data){
    console.log("news===>>>",data);
  })

  // setInterval(() => {
  //   io.emit('news',{'status':'正确'}); 
  // }, 1000)

})


// io.emit('news',function(data) {
//   console.log("news===>>>>",data)
// }) 



server.listen(8081,function(){
  console.log("listener in port 8081")
});