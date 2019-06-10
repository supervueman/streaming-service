const Product = require('../models/product');
const Stream = require('../models/stream');

module.exports = {
  queryStreams: async function (args, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const count = await Stream.find().countDocuments();
    const streams = await Stream.find().sort({
      createdAt: -1
    });

    return {
      streams: streams.map(stream => {
        return {
          ...stream._doc,
          _id: stream._id.toString()
        }
      }),
      count
    }
  }
}
