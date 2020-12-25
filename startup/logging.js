require('dotenv').config();
require('express-async-errors');
const morgan = require('morgan');
const winston = require('winston');

module.exports = (app) => {
  app.use(morgan('tiny'));
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
  );
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
};
