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
      phone: '',
      website: '',
      facebook: '',
      instagram: '',
      vkontakte: '',
      firstname: '',
      lastname: '',
      avatar: '',
      content: '',
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
      expiresIn: '5h'
    });

    return {
      token,
      userId: user._id.toString()
    }
  },

  queryProfile: async function (token, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Invalid input');
      error.code = 401;
      throw error;
    }

    return {
      ...user._doc,
      _id: user._id.toString()
    }
  },

  editUser: async function ({
    userInput
  }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }

    const user = await User.findById(req.userId);

    user.email = userInput.email;
    user.phone = userInput.phone;
    user.website = userInput.website;
    user.facebook = userInput.facebook;
    user.instagram = userInput.instagram;
    user.vkontakte = userInput.vkontakte;
    user.firstname = userInput.firstname;
    user.lastname = userInput.lastname;
    user.avatar = userInput.avatar;
    user.content = userInput.content;

    await user.save();

    user.password = '';

    return {
      _id: user._id.toString(),
      email: user.email,
      phone: user.phone,
      website: user.website,
      facebook: user.facebook,
      instagram: user.instagram,
      vkontakte: user.vkontakte,
      firstname: user.firstname,
      lastname: user.lastname,
      avatar: user.avatar,
      content: user.content,
    }
  },
}
