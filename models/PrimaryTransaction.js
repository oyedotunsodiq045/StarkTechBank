const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrimaryTransactionSchema = new Schema({
  description: {
    type: String,
    // required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters'],
    default: 'Primary Account Deposit',
  },
  type: {
    type: String,
    enum: ['Primary', 'Savings'],
    default: 'Primary',
  },
  status: {
    type: String,
    enum: ['Complete', 'Incomplete'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  // availableBalance: {
  //   type: Number,
  //   required: [true, 'Please add available balance'],
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'PrimaryAccount',
    // required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // name: {
  //   type: String,
  //   required: [true, 'Please add a name'],
  // },
  // location: {
  //   type: String,
  //   required: [true, 'Please add a location']
  // },
});

// 1 Transaction to 1 PrimaryAccount
// PrimaryTransactionSchema.index({
//   _id: 1,
//   account: 1
// }, {
//   unique: true
// });

module.exports = mongoose.model('PrimaryTransaction', PrimaryTransactionSchema);