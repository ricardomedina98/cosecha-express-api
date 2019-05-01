require('colors');
const http = require('http');
const socketIO = require('socket.io');
module.exports = app => {

    let server = http.createServer(app);
    server.listen(app.get('port'), ()=> {
        console.log(`Server on port ${app.get('port')}`.green);
    });  
    
    let io = socketIO(server);

    io.on('connection', (cliente)=> {
        console.log('Usuario conectado');
    });
}