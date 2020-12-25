const bodyParser = require('body-parser');
const { error } = require('../middlewares');
const { main } = require('../routes/routes.json');
const { postRoutes, userRoutes } = require('../routes');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(main.user, userRoutes);
  app.use(main.post, postRoutes);
  app.use(error);
};
