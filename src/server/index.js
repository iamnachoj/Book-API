const http = require(`http`);
const express = require('express');

const { appInitLoader } = require ('../loaders');
const config = require('../config') ;
const app = express();
const server = http.createServer(app);

function startServer() {
  appInitLoader(app);
  server.listen(config.port, () => console.log(`👂 server started on port ${config.port} on (${config.env}) mode`));
}
console.log({config});
startServer();

module.exports = app