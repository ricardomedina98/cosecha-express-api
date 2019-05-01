
const express = require('express');
const consign = require('consign');
const app = express();

consign({
  cwd: __dirname})
  .include('libs/config.js')
  .then('database.js')
  .then('libs/middlewares.js')
  .then('middlewares')
  .then('routes')
  .then('libs/boot.js')
  .into(app);

