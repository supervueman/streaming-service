const validator = require('validator');

const User = require('../models/user');
const Product = require('../models/product');

module.exports = {
  createProduct: async function ({
    productInput
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }
    const errors = [];
    if (validator.isEmpty(productInput.title) || !validator.isLength(productInput.title, {
        min: 5
      })) {
      errors.push({
        message: 'Title is invalid!'
      })
    }

    if (validator.isEmpty(productInput.content) || !validator.isLength(productInput.content, {
        min: 5
      })) {
      errors.push({
        message: 'Content is invalid!'
      })
    }

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

    const product = new Product({
      title: productInput.title,
      content: productInput.content,
      imageUrl: productInput.imageUrl,
      price: productInput.price,
      creator: user,
    });

    const createdProduct = await product.save();

    user.products.push(createdProduct);
    user.save();

    return {
      ...createdProduct._doc,
      _id: createdProduct._id.toString(),
    }
  },

  queryProduct: async function (prodId, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const product = await Product.findById(prodId.prodId);

    if (!product) {
      const error = new Error('Invalid input');
      error.code = 401;
      throw error;
    }

    return {
      ...product._doc,
      _id: product._id.toString()
    }
  },

  editProduct: async function ({
    productInput
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const product = await Product.findById(productInput.prodId);

    console.log(product)

    product.title = productInput.title;
    product.imageUrl = productInput.imageUrl;
    product.price = productInput.price;
    product.content = productInput.content;

    await product.save();

    return {
      _id: product._id.toString(),
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      content: product.content
    }
  },

  deleteProduct: async function ({
    id
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const product = await Product.findById(id);

    if (!product) {
      const error = new Error('Invalid input');
      error.code = 401;
      throw error;
    }

    if (product.creator.toString() !== req.userId.toString()) {
      const error = new Error('Not authorized!');
      error.code = 402;
      throw error;
    }

    await Product.findByIdAndRemove(id);

    const user = await User.findById(req.userId);
    user.products.pull(id);

    await user.save();
    return true;
  }
}
