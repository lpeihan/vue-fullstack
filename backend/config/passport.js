'use strict';

const Model = require('../models');

const passport = require('../utils/passport');

const PassportError = passport.PassportError;

function getUserModel() {
  return Model('User');
}

passport.serializeUser(user => Promise.resolve(user ? user.id : undefined));
passport.deserializeUser(async (session) => {
  const user = await getUserModel().findOne({
    id: session
  });
  return user;
});

passport.use('local', async function (params) {
  const user = await getUserModel().findOne({
    account: params.account
  });

  if (!user) {
    throw new PassportError('用户不存在');
  }

  if (!(await user.authenticate(params.password))) {
    throw new PassportError('用户名或密码错误');
  }

  return user;
});

module.exports = passport;
