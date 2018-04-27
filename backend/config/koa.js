const Koa = require('koa');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');

const session = require('./session');
const logger = require('../utils/logger')(__filename);

module.exports = (config) => {
  const app = new Koa();

  app.keys = config.cookie.keys;

  onerror(app);

  app
    .use(bodyparser())
    .use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      logger.trace(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })
    .use(session(config, app));

  app.promise = new Promise((resolve, reject) => {
    app.listen(config.port, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
        logger.info(`Koa listening on port ${config.port}`);
      }
    });
  });

  app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx);
  });

  return app;
};
