const express = require('express');
const consign = require('consign');

const app = express();
const port = process.env.PORT || 3000;

consign({
    cwd: __dirname
})
  .include('libs/config.js')
  .then('db.js')
  .then('libs/boot.js')
  .into()


