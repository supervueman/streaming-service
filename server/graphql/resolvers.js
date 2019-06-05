const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
  createUser: async function ({
    userInput
  }, req) {
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({
        message: 'E-mail in invalid!'
      })
    }

    if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {
        min: 5
      })) {
      errors.push({
        message: 'Password short!'
      });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({
      email: userInput.email
    });

    if (existingUser) {
      const error = new Error('User exists already');
      throw error;
    }

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      password: hashedPw
    });

    const createdUser = await user.save();

    return {
      ...createdUser._doc,
      _id: createdUser._id.toString()
    };
  },

  login: async function ({
    email,
    password
  }) {
    const user = await User.findOne({
      email
    })
    if (!user) {
      const error = new Error('User not found!');
      error.code = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Password is not correct!');
      error.code = 401;
      throw error;
    }

    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
    }, 'somesupersecretesecrete', {
      expiresIn: '1h'
    });

    return {
      token,
      userId: user._id.toString()
    }
  }
}
