const send = require('koa-send');
const path = require('path');

module.exports = {
  async html(ctx) {
    await send(ctx, 'index.html', {
      root: path.join(__dirname, '..')
    });
  }
};
