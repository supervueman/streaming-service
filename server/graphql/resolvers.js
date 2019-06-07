const userController = require('../controllers/user');
const productController = require('../controllers/product');
const usersController = require('../controllers/users');

module.exports = {
  ...userController,
  ...productController,
  ...usersController
}
