const profileController = require('../controllers/profile');
const productController = require('../controllers/product');
const usersController = require('../controllers/users');

module.exports = {
  ...profileController,
  ...productController,
  ...usersController
}
