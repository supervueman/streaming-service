const User = require('../models/user');

module.exports = {
  users: async function (args, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const count = await User.find().countDocuments();
    const users = await User.find().sort({
      createdAt: -1
    });

    return {
      users: users.map(user => {
        return {
          ...user._doc,
          _id: user._id.toString()
        }
      }),
      count
    }
  }
}
