const mongoose = require('mongoose');

let threadsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Title harus diisi'],
      minlength: 5,
      maxlength: 200,
    },
    body: {
      type: String,
      require: [true, 'Body harus diisi'],
      minlength: 5,
      maxlength: 4000,
    },
    category: {
      type: String,
      require: [true, 'Category harus diisi'],
      minlength: 2,
      maxlength: 25,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    upVotesBy: {
      type: Array,
    },
    downVotesBy: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Threads', threadsSchema);
