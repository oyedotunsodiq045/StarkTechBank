const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavingsAccountSchema = new Schema({
  savingsAccountNumber: {
    type: Number,
    required: [true, 'Please add an account number'],
    unique: true,
  },
  accountBalance: {
    type: Number,
    required: [true, 'Please add an account balance'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

// Prevent user from creating multiple savings account
SavingsAccountSchema.index({
  _id: 1,
  user: 1
}, {
  unique: true
});

// Reverse populate with virtuals
SavingsAccountSchema.virtual('savingsTransactionLists', {
  ref: 'SavingsTransaction',
  localField: '_id',
  foreignField: 'account',
  justOne: false
});

module.exports = mongoose.model('SavingsAccount', SavingsAccountSchema);