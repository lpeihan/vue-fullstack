'use strict';

const crypto = require('crypto');
const Promise = require('bluebird');
const _ = require('lodash');

const pbkdf2 = Promise.promisify(crypto.pbkdf2);

const key = {
  userId(id) {
    return `user:${id}`;
  }
};

module.exports = (Schema, redis) => {
  /**
   * User Schema
   */
  const UserSchema = new Schema({
    account: String,
    salt: String,
    hash_password: String,
    create_date: { type: Number, default: Date.now },
    update_date: Number
  });

  /**
   * Virtuals
   */

  UserSchema
    .virtual('_info')
    .get(function() {
      const result = _.pick(this, [
        'account',
        'create_date',
        'update_date'
      ]);
      return result;
    });

  /**
   * Hooks
   */
  UserSchema
    .pre('save', function(next) {
      this.update_date = Date.now();
      next();
    });

  /**
   * Virtuals
   */
  // 密码加密
  UserSchema
    .virtual('password')
    .set(function(password) {
      this.salt = crypto.randomBytes(15).toString('base64');
      this.hash_password = this.encryptPassword(password);
    });

  /**
   * Methods
   */
  UserSchema.methods = {
    // 验证密码的正确性
    async authenticate(password) {
      return (await this.encryptPasswordAsync(password)) === this.hash_password;
    },
    encryptPassword(password) {
      return crypto.pbkdf2Sync(password, this.salt || 'salt', 2, 63, 'sha256')
        .toString('base64');
    },
    async encryptPasswordAsync(password) {
      const hashPassword = (await pbkdf2(password, this.salt || '', 2, 63, 'sha256'))
        .toString('base64');

      return hashPassword;
    }
  };

  /**
   * Statics
   */
  UserSchema.statics = {
    async setUserId(id) {
      const k = key.userId(id);
      const result = await redis.set(k, id);
      return result;
    }
  };

  return UserSchema;
};
