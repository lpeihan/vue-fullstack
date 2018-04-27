const koa = require('./config/koa');
const config = require('./config');
const mongoose = require('./config/mongoose');
const redis = require('./config/redis');
const logger = require('./utils/logger')(__filename);

const app = koa(config);
const mongooseClient = mongoose(config);
const redisClient = redis(config);

Promise.all([
  app.promise,
  mongooseClient.promise,
  redisClient.promise
])
  .then(() => {
    require('./models')(mongooseClient, redisClient);

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
