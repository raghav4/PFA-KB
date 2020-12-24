const auth = require('./auth.middleware');
const error = require('./error.middleware');
const tryCatch = require('./tryCatch.middleware');

module.exports = {
  auth,
  error,
  tryCatch,
};
