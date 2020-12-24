require('dotenv').config();
const config = require('config');
const express = require('express');
const debug = require('debug')('app:index');

const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => debug(`Listening on PORT ${PORT}...`));

require('./startup/db')();

module.exports = server;
