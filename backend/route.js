'use strict';

const Router = require('koa-router');
const Record = require('./controllers/record');

const apiV1Routes = {
  '/records': {
    get: Record.getRecords,
    post: Record.createRecord
  },
  '/records/:id': {
    put: Record.updateRecord,
    delete: Record.deleteRecord
  }
};

module.exports = (app) => {
  const base = new Router();
  const apiV1 = new Router();

  for (const path in apiV1Routes) {
    for (const method in apiV1Routes[path]) {
      apiV1[method](path, apiV1Routes[path][method]);
    }
  }

  base
    .use('/api/v1', apiV1.routes(), apiV1.allowedMethods());

  app
    .use(base.routes())
    .use(base.allowedMethods());
};