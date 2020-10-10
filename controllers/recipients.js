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
  const recipient = await Recipient.findById(req.params.id).cache({
    time: 10
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

// @desc    Create new Recipient
// @route   POST /api/v1/recipients
// @access  Public
exports.createRecipient = asyncHandler(async (req, res, next) => {

  let userName = req.body.userName;
  let accountNumber = req.body.accountNumber;
  let type = req.body.type;
  // let description = req.body.description;

  const user = await User.findOne({
    userName
  }).populate([{
    path: 'primaryAccountId',
    select: {
      primaryAccountNumber: 1,
      accountBalance: 1
    },
  }, {
    path: 'savingsAccountId',
    select: {
      savingsAccountNumber: 1,
      accountBalance: 1
    },
  }]);

  // console.log(user);
  // console.log(user.userName);
  // console.log(user.primaryAccountId.primaryAccountNumber);
  // console.log(user.savingsAccountId.savingsAccountNumber);

  if (!user) {
    return next(new ErrorResponse(`Recipient must be a StarkTechBank account holder`, 400));
  }

  // Add User to req body
  req.body.userRef = user.id;

  let uN = user.userName == userName;
  let foundPan = user.primaryAccountId.primaryAccountNumber == accountNumber;
  let foundSan = user.savingsAccountId.savingsAccountNumber == accountNumber;
  // console.log(uN);

  let validAccountNumber = foundPan || foundSan ? true : false;

  if (!validAccountNumber) {
    return next(new ErrorResponse(`Invalid account details`, 401));
  }

  const recipient = await Recipient.findOne({
    accountNumber,
    type
  });
  // console.log(recipient);

  let notFound = !recipient && uN ? true : false;
  // console.log(notFound);

  if (notFound) {
    // let recipient = new Recipient();
    // recipient.userName = userName;
    // recipient.accountNumber = accountNumber;
    // recipient.type = type;
    // recipient.description = description;
    // recipient.userRef = user.id;
    // recipient.save();
    let newRecipient = await Recipient.create(req.body);

    clearKey(Recipient.collection.collectionName);

    res.status(201).json({
      success: true,
      data: newRecipient,
    });

  } else {
    return next(
      new ErrorResponse(
        `Recipient already added to list`,
        404
      )
    );
  }

  // if (uN) {
  //   let recipient = new Recipient();
  //   recipient.userName = user.userName;
  //   recipient.firstName = user.firstName;
  //   recipient.lastName = user.lastName;
  //   recipient.email = user.email;
  //   recipient.phone = user.phone;
  //   recipient.accountNumber = user.accountNumber;
  //   recipient.type = type;
  //   recipient.description = description;

  //   recipient.save();
  // } else {
  //   return next(
  //     new ErrorResponse(
  //       `Recipient must be a StarkTechBank account holder`,
  //       404
  //     )
  //   );
  // }



  // const recipient;
  // const user = await User.findOne({
  //   email: req.body.email
  // });

  // // const primaryAccount = await PrimaryAccount.findOne({
  // //   primaryAccountNumber: req.body.accountNumber
  // // });

  // // const savingsAccount = await SavingsAccount.findOne({
  // //   savingsAccountNumber: req.body.accountNumber
  // // });

  // // console.log(`User object ==> ${user}`.red);
  // // console.log(`User id ==> ${user.id}`.green);
  // // console.log(`User _id ==> ${user._id}`.blue);
  // // console.log(primaryAccount);
  // // console.log(savingsAccount);

  // // if (user || primaryAccount || savingsAccount) {
  // if (user) {
  //   //
  //   req.body.userRef = user.id;
  //   // req.body.userRef = primaryAccount.userRef;
  //   // req.body.userRef = savingsAccount.userRef;
  //   recipient = await Recipient.create(req.body);

  // } else {
  //   return next(
  //     new ErrorResponse(
  //       `Recipient is not an account holder`,
  //       404
  //     )
  //   );
  // }

  // clearKey(Recipient.collection.collectionName);

  // res.status(201).json({
  //   success: true,
  //   data: recipient,
  // });
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