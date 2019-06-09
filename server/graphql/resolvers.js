const profileController = require('../controllers/profile');
const productsController = require('../controllers/products');
const productController = require('../controllers/product');
const usersController = require('../controllers/users');
const userController = require('../controllers/user');

module.exports = {
  ...profileController,
  ...productsController,
  ...productController,
  ...usersController,
  ...userController
}
