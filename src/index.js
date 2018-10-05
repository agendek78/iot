const express = require('express');
const consign = require('consign');

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);

consign({
    cwd: __dirname
})
  .include('libs/config.js')
  .then('db.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app)

