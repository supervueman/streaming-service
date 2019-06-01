const express = require('express');
const router = express.Router();

const {
  signin,
  signup,
  profile,
  logout
} = require('../controllers/user.js');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);
router.get('/profile', profile);

module.exports = router;
