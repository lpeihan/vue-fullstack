'use strict';

const mongoose = require('mongoose');
const logger = require('../utils/logger')(__filename);

module.exports = (config) => {
  const mongoConfig = config.mongo;
  const mongoStr = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${config.app.name}`;

  mongoose.connect(mongoStr);
  const client = mongoose.connection;

  client.promise = new Promise((resolve, reject) => {
    client.once('open', () => {
      logger.info(`MongoDB open on ${mongoStr}`);
      resolve();
    });

    client.on('error', (err) => {
      logger.fatal('MongoDB error', err);
      reject(err);
    });

    client.on('connected', () => logger.info('MongoDB connected'));

    client.on('reconnected', () => logger.info('MongoDB reconnected'));

    client.on('disconnected', () => {
      logger.warn('MongoDB disconnected');

      setTimeout(() => {
        client.open(mongoStr);
      }, 5000);
    });
  });

  return mongoose;
};
