const validator = require('validator');

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

    const product = await Product.findById(streamInput.prodId); // Edit prodId
    if (!product) {
      const error = new Error('Invalid input');
      error.code = 401;
      throw error;
    }

    const stream = new Stream({
      title: streamInput.title,
      imageUrl: streamInput.imageUrl,
      streamer: user,
      product: product
    });

    const createdStream = await stream.save();

    user.stream = createdStream;
    await user.save();

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

  // editProduct: async function ({
  //   productInput
  // }, req) {
  //   if (!req.isAuth) {
  //     const error = new Error('Not authenticated!');
  //     error.code = 401;
  //     throw error;
  //   }

  //   const product = await Product.findById(productInput.prodId);

  //   console.log(product)

  //   product.title = productInput.title;
  //   product.imageUrl = productInput.imageUrl;
  //   product.price = productInput.price;
  //   product.content = productInput.content;

  //   await product.save();

  //   return {
  //     _id: product._id.toString(),
  //     title: product.title,
  //     imageUrl: product.imageUrl,
  //     price: product.price,
  //     content: product.content
  //   }
  // },

  // deleteProduct: async function ({
  //   id
  // }, req) {
  //   if (!req.isAuth) {
  //     const error = new Error('Not authenticated!');
  //     error.code = 401;
  //     throw error;
  //   }

  //   const product = await Product.findById(id);

  //   if (!product) {
  //     const error = new Error('Invalid input');
  //     error.code = 401;
  //     throw error;
  //   }

  //   if (product.creator.toString() !== req.userId.toString()) {
  //     const error = new Error('Not authorized!');
  //     error.code = 402;
  //     throw error;
  //   }

  //   await Product.findByIdAndRemove(id);

  //   const user = await User.findById(req.userId);
  //   user.products.pull(id);

  //   await user.save();
  //   return true;
  // }
}
