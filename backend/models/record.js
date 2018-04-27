'use strict';

module.exports = (Schema, redis) => {
  /**
   * Record Schema
   */
  const RecordSchema = new Schema({
    title: String,
    date: String,
    amount: Number,
    create_date: { type: Number, default: Date.now },
    update_date: Number
  });

  return RecordSchema;
};
