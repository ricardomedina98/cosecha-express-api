require('colors');

const express = require('express');
const cors = require('cors')
const app = express();

const consign = require('consign');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const socketIO = require('socket.io')(http);

app.use(express.static('./public'));
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({extended: false}));         
app.use(express.json());
app.use(cookieParser());
app.io = socketIO;
app.use(cors());


consign({cwd: 'src'})
.include('libs/config.js')
.then('./database.js')    
.then('middlewares')
.then('controllers')
.then('routes')
.then('sockets') 
.into(app); 

//Iniciar Server
http.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`.green);
});


