const validator = require('validator');

const io = require('../socket');

const User = require('../models/user');
const Product = require('../models/product');
const Stream = require('../models/stream');

module.exports = {
  createStream: async function ({
    streamInput
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }
    const errors = [];
    if (errors.length > 0) {
      const error = new Error('Invalid input');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Invalid input');
      error.code = 401;
      throw error;
    }

    const stream = new Stream({
      title: streamInput.title,
      imageUrl: streamInput.imageUrl,
      streamer: user,
    });

    if (streamInput.prodId) {
      const product = await Product.findById(streamInput.prodId); // Edit prodId
      if (!product) {
        const error = new Error('Invalid input');
        error.code = 401;
        throw error;
      }
      stream.product = product;
    }

    const createdStream = await stream.save();

    user.stream = createdStream;
    user.isStream = true;

    await user.save();

    io.getIO().emit('streams', {
      action: 'create',
      stream: {
        title: createdStream._doc.title,
        imageUrl: createdStream._doc.imageUrl,
        streamer: {
          _id: createdStream._doc.streamer._id.toString(),
          firstname: createdStream._doc.streamer.firstname,
          lastname: createdStream._doc.streamer.lastname
        },
        product: createdStream._doc.product,
        _id: createdStream._id.toString(),
      },
    });

    return {
      ...createdStream._doc,
      _id: createdStream._id.toString(),
    }
  },

  queryStream: async function ({
    id
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const stream = await Stream.findById(id).populate('streamer').populate('product');

    if (!stream) {
      const error = new Error('Invalid input');
      error.code = 401;
      throw error;
    }

    return {
      ...stream._doc,
      _id: stream._id.toString()
    }
  },

  editStream: async function ({
    streamInput
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const stream = await Stream.findById(streamInput.id);
    stream.title = streamInput.title;
    stream.imageUrl = streamInput.imageUrl;

    if (streamInput.prodId !== '') {
      const product = await Product.findById(streamInput.prodId);

      if (product) {
        stream.product = product
      }
    }

    await stream.save();

    io.getIO().emit('stream', {
      action: 'update',
      stream: {
        title: stream._doc.title,
        imageUrl: stream._doc.imageUrl,
        product: stream._doc.product,
        _id: stream._id.toString(),
      },
    });

    return {
      ...stream._doc,
      _id: stream._id.toString()
    }
  },

  deleteStream: async function ({
    id
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const stream = await Stream.findById(id);

    if (!stream) {
      const error = new Error('Invalid input');
      error.code = 401;
      throw error;
    }

    if (stream.streamer.toString() !== req.userId.toString()) {
      const error = new Error('Not authorized!');
      error.code = 402;
      throw error;
    }

    await Stream.findByIdAndRemove(id);

    const user = await User.findById(req.userId);
    user.isStream = false;

    await user.save();

    io.getIO().emit('streams', {
      action: 'delete',
      _id: id
    });
    return true;
  }
}
