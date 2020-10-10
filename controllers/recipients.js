const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Recipient = require('../models/Recipient');
const User = require('../models/User');
// const PrimaryAccount = require('../models/PrimaryAccount');
// const SavingsAccount = require('../models/SavingsAccount');
require('colors');
const {
  clearKey
} = require("../middleware/cache");

// @desc    Get all Recipients
// @route   GET /api/v1/recipients
// @access  Private
exports.getRecipients = asyncHandler(async (req, res, next) => {
  const recipients = await Recipient.find().cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: recipients.length,
    data: recipients,
  });
});

// @desc    Get single Recipient
// @route   GET /api/v1/recipients/:id
// @access  Private
exports.getRecipient = asyncHandler(async (req, res, next) => {
  const recipient = await Recipient.findById(req.params.id);

  if (!recipient) {
    return next(
      new ErrorResponse(
        `Recipient not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: recipient,
  });
});

// @desc    Create new Recipient
// @route   POST /api/v1/recipients
// @access  Public
exports.createRecipient = asyncHandler(async (req, res, next) => {

  // const recipient;
  const user = await User.findOne({
    email: req.body.email
  });

  // const primaryAccount = await PrimaryAccount.findOne({
  //   primaryAccountNumber: req.body.accountNumber
  // });

  // const savingsAccount = await SavingsAccount.findOne({
  //   savingsAccountNumber: req.body.accountNumber
  // });

  // console.log(`User object ==> ${user}`.red);
  // console.log(`User id ==> ${user.id}`.green);
  // console.log(`User _id ==> ${user._id}`.blue);
  // console.log(primaryAccount);
  // console.log(savingsAccount);

  // if (user || primaryAccount || savingsAccount) {
  if (user) {
    //
    req.body.userRef = user.id;
    // req.body.userRef = primaryAccount.userRef;
    // req.body.userRef = savingsAccount.userRef;
    recipient = await Recipient.create(req.body);

  } else {
    return next(
      new ErrorResponse(
        `Recipient is not an account holder`,
        404
      )
    );
  }

  clearKey(Recipient.collection.collectionName);

  res.status(201).json({
    success: true,
    data: recipient,
  });
});

// @desc    Update Recipient
// @route   PUT /api/v1/recipients/:id
// @access  Private
exports.updateRecipient = asyncHandler(async (req, res, next) => {
  const recipient = await Recipient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!recipient) {
    return next(
      new ErrorResponse(
        `Recipient not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: recipient,
  });
});

// @desc    Delete Recipient
// @route   DELETE /api/v1/recipients/:id
// @access  Private
exports.deleteRecipient = asyncHandler(async (req, res, next) => {
  const recipient = await Recipient.findByIdAndDelete(req.params.id);

  if (!recipient) {
    return next(
      new ErrorResponse(
        `Recipient not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});