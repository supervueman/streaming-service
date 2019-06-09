const validator = require('validator');

const User = require('../models/user');

module.exports = {
  queryUser: async function ({
    id
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const user = await User.findById(id);

    if (!user) {
      const error = new Error('Invalid input');
      error.code = 401;
      throw error;
    }

    return {
      ...user._doc,
      _id: user._id.toString()
    }
  }
}
