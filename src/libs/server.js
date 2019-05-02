const express = require('express');
const consign = require('consign');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('./public'));
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({extended: false}));         
app.use(express.json());
app.use(cookieParser());



consign({
    cwd: 'src'})
    .include('libs/config.js')
    .then('./database.js')    
    .then('middlewares')
    .then('controllers')
    .then('routes')    
    .into(app);  


module.exports = app;