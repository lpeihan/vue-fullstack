const Koa = require('koa');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const path = require('path');

const session = require('./session');
const passport = require('./passport');
const logger = require('../utils/logger')(__filename);

module.exports = (config) => {
  const app = new Koa();

  app.keys = config.cookie.keys;

  onerror(app);

  app
    .use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      logger.trace(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })
    .use(bodyparser())
    .use(async function(ctx, next) {
      await next();

      const userCookie = ctx.user
        ? encodeURIComponent(JSON.stringify(ctx.user))
        : undefined;

      ctx.cookies.set(`${config.app.name}.user`, userCookie, {
        httpOnly: false,
        maxAge: config.cookie.maxAge,
        signed: false, // 是否加密
        overwrite: true
      });
    })
    .use(session(config, app))
    .use(passport.middleware())
    .use(require('koa-static')(path.join(__dirname, '..', '/static')));

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
