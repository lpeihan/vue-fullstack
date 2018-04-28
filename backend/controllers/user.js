const passport = require('../utils/passport');
const logger = require('../utils/logger')(__filename);
const handleError = require('../utils/handleError')(logger);

module.exports = {
  async login(ctx) {
    try {
      const user = await passport.login('local', ctx);

      ctx.body = user;
    } catch (e) {
      handleError(e.message, e, ctx, 400);
    }
  },
  async logout(ctx) {
    try {
      await passport.logout(ctx);

      ctx.body = null;
    } catch (e) {
      handleError(e.message, e, ctx, 400);
    }
  }
};
