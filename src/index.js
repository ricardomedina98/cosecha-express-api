require('colors');
const http = require('http');
const socketIO = require('socket.io');
const app = require('./libs/server');

let server = http.createServer(app);
server.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`.green);
});  

let io = socketIO(server);
console.log(app.database.models);
io.on('connection', (client) => {
  console.log('Usuario conectado');
});