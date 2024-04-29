const mongoose = require('mongoose');

let commentsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: [true, 'Content harus diisi'],
      minlength: 5,
      maxlength: 1500,
    },
    upVotesBy: {
      type: Array,
    },
    downVotesBy: {
      type: Array,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentsSchema);
