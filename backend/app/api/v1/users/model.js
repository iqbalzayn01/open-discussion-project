const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama harus diisi'],
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email harus diisi'],
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: [true, 'Password harus diisi'],
      minlength: 6,
    },
    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          this.name
        )}&background=random`;
      },
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
