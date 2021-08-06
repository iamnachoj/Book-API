const { initVendorMiddlewares } = require('../middlewares/index');
const installApiEndpoints = require('../api/routes');
require('../auth/passport') ;

const expressLoader = (app) => {
  app.set('trust proxy', true);
  app.disable('x-powered-by');
  initVendorMiddlewares(app);

  app.use('/api/v1', installApiEndpoints);

  return app;
};

module.exports = expressLoader;