const express = require('express');
const consign = require('consign');

const https = require("https"),
  fs = require("fs");


const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/demo.connectyourworker.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/demo.connectyourworker.com/fullchain.pem")
};

const cors = require('cors')


const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);

app.use(cors())

https.createServer(options, app).listen(3030);

consign({
    cwd: __dirname
})
  .include('libs/config.js')
  .then('db.js')  
  .then('routes')
  .then('libs/boot.js')
  .then('libs/helmet.js')
  .into(app)

