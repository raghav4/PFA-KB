require('express-async-errors');
require('dotenv').config();
const config = require('config');
const express = require('express');
const debug = require('debug')('app:index');

const app = express();

if (!config.get('jwt.privateKey')) {
  debug('jwtPrivateKey is not defined');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => debug(`Listening on PORT ${PORT}...`));

require('./startup/logging')(app);
require('./startup/db')();
require('./startup/routes')(app);

module.exports = server;
