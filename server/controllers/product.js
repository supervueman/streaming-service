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
      isActice: false
    });

    const createdProduct = await product.save();

    user.products.push(createdProduct);
    user.save();

    return {
      ...createdProduct._doc,
      _id: createdProduct._id.toString(),
      createdAt: createdProduct.createdAt.toISOString(),
      updatedAt: createdProduct.updatedAt.toISOString()
    }
  }
}
