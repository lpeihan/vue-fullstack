const koa = require('./config/koa');
const config = require('./config');
const mongoose = require('./config/mongoose');
const logger = require('./utils/logger')(__filename);

const app = koa(config);
const mongooseClient = mongoose(config);

Promise.all([
  app.promise,
  mongooseClient.promise
])
  .then(() => {
    require('./models')(mongooseClient);

    require('./route')(app);

    logger.info(`${config.app.name} start success`);
  })
  .catch((err) => {
    logger.fatal('start failed', err);
  });

process.on('uncaughtException', (err) => {
  logger.fatal('uncaughtException', err);
  process.nextTick(() => process.exit(1));
});
