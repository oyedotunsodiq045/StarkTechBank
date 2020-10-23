const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrimaryAccountSchema = new Schema({
  primaryAccountNumber: {
    type: Number,
    required: [true, 'Please add an account number'],
    unique: true,
  },
  accountBalance: {
    type: Number,
    required: [true, 'Please add an account balance'],
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  userRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

// Prevent user from creating multiple primary account
PrimaryAccountSchema.index({
  _id: 1,
  user: 1
}, {
  unique: true
});

// Reverse populate with virtuals
PrimaryAccountSchema.virtual('primaryTransactionLists', {
  ref: 'PrimaryTransaction',
  localField: '_id',
  foreignField: 'account',
  justOne: false
});

module.exports = mongoose.model('PrimaryAccount', PrimaryAccountSchema);