const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streamSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  streamer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Stream', streamSchema);
