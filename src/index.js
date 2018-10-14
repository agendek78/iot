const express = require('express');
const consign = require('consign');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.use(cors());

consign({
    cwd: __dirname
})
  .include('libs/config.js')
  .then('db.js')  
  .then('routes')
  .then('libs/boot.js')
  .then('libs/helmet.js')
  .then('libs/zone.js')
  .then('libs/status.js')
  .then('libs/events.js')
  .into(app)

