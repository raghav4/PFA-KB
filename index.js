// try catch replacement for async/await
require('express-async-errors');
require('dotenv').config();
const config = require('config');
const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const debug = require('debug')('app:index');

const app = express();

if (!config.get('jwt.privateKey')) {
  debug('jwtPrivateKey is not defined');
  process.exit(1);
}

if (process.env.NODE_ENV === 'production') {
  if (cluster.isMaster) {
    // Master
    for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', () => {
      cluster.fork();
    });
  } else {
    // Worker
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => debug(`Listening on PORT ${PORT}...`));
  }
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => debug(`Listening on PORT ${PORT}...`));
}

require('./startup/logging')(app);
require('./startup/db')();
require('./startup/routes')(app);
