const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipientSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
  },
  accountNumber: {
    type: Number,
    required: [true, 'Please add recipient account number'],
  },
  type: {
    type: String,
    enum: ['Primary', 'Savings'],
    required: [true, 'Please add recipient account type'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  userRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: true
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // }
}, {
  timestamps: true
});

// 1 recipient to 1 user
// RecipientSchema.index({
//   _id: 1,
//   user: 1
// }, {
//   unique: true
// });

module.exports = mongoose.model('Recipient', RecipientSchema);