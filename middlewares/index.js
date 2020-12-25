const auth = require('./auth.middleware');
const error = require('./error.middleware');

module.exports = {
  auth,
  error,
};
