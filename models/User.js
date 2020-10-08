const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'Please add a firstname'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add a lastname'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  role: {
    type: String,
    enum: ['user', 'marketer', 'account', 'audit', 'legal'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false, // what this will do is when we get a user through our API it's not going to show the password
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({
      id: this._id,
    },
    process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Reverse populate with virtuals
UserSchema.virtual('primaryAccount', {
  ref: 'PrimaryAccount',
  localField: '_id',
  foreignField: 'userRef',
  justOne: false,
});

// Reverse populate with virtuals
UserSchema.virtual('savingsAccount', {
  ref: 'SavingsAccount',
  localField: '_id',
  foreignField: 'userRef',
  justOne: false,
});

// Reverse populate with virtuals
UserSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'userRef',
  justOne: false,
});

// Reverse populate with virtuals
UserSchema.virtual('recipients', {
  ref: 'Recipient',
  localField: '_id',
  foreignField: 'userRef',
  justOne: false,
});

module.exports = mongoose.model('User', UserSchema);