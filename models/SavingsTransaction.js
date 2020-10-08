const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavingsTransactionSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  type: {
    type: String,
    enum: ['primary', 'savings'],
  },
  status: {
    type: String,
    required: [true, 'Please add a status'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  availableBalance: {
    type: Number,
    required: [true, 'Please add available balance'],
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
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'SavingsAccount',
    required: true
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

// 1 Transaction to 1 SavingsAccount
// SavingsTransactionSchema.index({
//   _id: 1,
//   account: 1
// }, {
//   unique: true
// });

module.exports = mongoose.model('SavingsTransaction', SavingsTransactionSchema);