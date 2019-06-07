const profileController = require('../controllers/profile');
const productController = require('../controllers/product');
const usersController = require('../controllers/users');
const userController = require('../controllers/user');

module.exports = {
  ...profileController,
  ...productController,
  ...usersController,
  ...userController
}
