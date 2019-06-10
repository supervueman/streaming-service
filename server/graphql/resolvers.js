const profileController = require('../controllers/profile');
const productsController = require('../controllers/products');
const productController = require('../controllers/product');
const usersController = require('../controllers/users');
const userController = require('../controllers/user');
const streamsController = require('../controllers/streams');
const streamController = require('../controllers/stream');

module.exports = {
  ...profileController,
  ...productsController,
  ...productController,
  ...usersController,
  ...userController,
  ...streamsController,
  ...streamController
}
