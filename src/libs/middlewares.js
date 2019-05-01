const express = require('express');
const cookieParser = require('cookie-parser')
module.exports = app => {

    app.set('port', process.env.PORT || 3000);
    app.use(express.urlencoded({extended: false}));         
    app.use(express.json());
    app.use(cookieParser());

}