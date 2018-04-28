'use strict';

const Model = require('./models');
const User = Model('User');

module.exports = async function(ctx) {
  const user = await User.findOne({ account: 'root' });

  if (!user) {
    const newUser = new User({
      account: 'root',
      password: 'root1234'
    });

    await newUser.save();
  }

  ctx.body = '初始化用户成功';
};
