require('dotenv').config();
const config = require('config');
const mongoose = require('mongoose');
const debug = require('debug')('app:db');

module.exports = () => {
  try {
    mongoose.connect(config.get('DB_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    debug('Connected to MongoDB..');
  } catch (ex) {
    debug(ex);
  }
};
