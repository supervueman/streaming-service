const mongoose = require('mongoose');

exports.dbconnect = async (cb) => {
  await mongoose.connect(
    process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  cb();
};
