const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
module.exports = app => {
    
    app.set('port', process.env.PORT || 3000);
    app.use(express.urlencoded({extended: false}));         
    app.use(express.json());
    app.use(cookieParser());
    

}