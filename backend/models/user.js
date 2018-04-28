'use strict';

const crypto = require('crypto');
const Promise = require('bluebird');

const pbkdf2 = Promise.promisify(crypto.pbkdf2);

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

  return UserSchema;
};
