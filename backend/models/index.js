'use strict';

const fs = require('fs');

const modelFiles = (fs.readdirSync(__dirname).filter((file) => file !== 'index.js'))
  .map(model => model.split('.')[0]);

let models = null;

module.exports = (modelName, redisClient) => {
  if (models) {
    return models[modelName];
  }

  if (typeof modelName === 'object') {
    const mongoose = modelName;
    models = {};

    modelFiles.forEach((model) => {
      const name = model.substring(0, 1).toUpperCase() + model.substring(1);
      models[name] = mongoose.model(name, require(`./${model}`)(mongoose.Schema, redisClient));
    });
  }
};
