const Product = require('../models/product');

module.exports = {
  queryProducts: async function (args, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const count = await Product.find({
      creator: req.userId
    }).countDocuments();
    const products = await Product.find({
      creator: req.userId
    }).sort({
      createdAt: -1
    });

    return {
      products: products.map(product => {
        return {
          ...product._doc,
          _id: product._id.toString()
        }
      }),
      count
    }
  }
}
