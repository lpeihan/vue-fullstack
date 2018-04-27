'use strict';

const Model = require('../models');
const Record = Model('Record');
const logger = require('../utils/logger')(__filename);
const handleError = require('../utils/handleError')(logger);

const _ = require('lodash');

module.exports = {
  async getRecords(ctx) {
    try {
      const records = await Record.find();

      ctx.body = records;
    } catch (e) {
      handleError('获取财务记录失败', e, ctx);
    }
  },
  async createRecord(ctx) {
    try {
      const record = new Record(ctx.request.body);
      await record.save();

      ctx.status = 201;
      ctx.body = record;
    } catch (e) {
      handleError('创建财务记录失败', e, ctx);
    }
  },
  async updateRecord(ctx) {
    try {
      const record = await Record.findById(ctx.params.id);

      if (record) {
        _.assign(record, ctx.request.body);
      }

      const res = await record.save();

      ctx.status = 201;
      ctx.body = res;
    } catch (e) {
      handleError('更新财务记录失败', e, ctx);
    }
  },
  async deleteRecord(ctx) {
    try {
      await Record.findByIdAndRemove(ctx.params.id);

      ctx.body = null;
    } catch (e) {
      handleError('删除财务记录失败', e, this);
    }
  }
};
