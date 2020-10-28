const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const PrimaryAccount = require('../models/PrimaryAccount');
const SavingsAccount = require('../models/SavingsAccount');
const moment = require('moment');
const {
  clearKey
} = require("../middleware/cache");

// @desc    Get all Users that Registered this month
// @route   GET /api/v1/users/month
// @access  Private
// @resource https://momentjscom.readthedocs.io/en/latest/moment/03-manipulating/03-start-of/
exports.getThisMonthRegisteredUsers = asyncHandler(async (req, res, next) => {

  let start = moment().startOf('month'); // set to the first of this month, 12:00 am
  let end = moment().endOf('month'); // set to the last day of this month, 23:59 pm 

  const users = await User.find({
    createdAt: {
      $gte: start,
      $lt: end
    }
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Users that Registered this week
// @route   GET /api/v1/users/week
// @access  Private
exports.getThisWeekRegisteredUsers = asyncHandler(async (req, res, next) => {

  let start = moment().startOf('week'); // set to the first day of this week, 12:00 am
  let end = moment().endOf('week'); // set to the last day of this week, 23:59 pm

  const users = await User.find({
    createdAt: {
      $gte: start,
      $lt: end
    }
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Users that Registered today
// @route   GET /api/v1/users/today
// @access  Private
exports.getTodayRegisteredUsers = asyncHandler(async (req, res, next) => {

  // Using Mongoose
  // let start = new Date();
  // start.setHours(0,0,0,0);

  // let end = new Date();
  // end.setHours(23,59,59,999);

  // Using Moment
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  const users = await User.find({
    createdAt: {
      $gte: start,
      $lt: end
    }
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Marketers
// @route   GET /api/v1/users/marketers
// @access  Private
exports.getMarketers = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    role: 'marketer'
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Accountants
// @route   GET /api/v1/users/accountants
// @access  Private
exports.getAccountants = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    role: 'account'
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Auditors
// @route   GET /api/v1/users/auditors
// @access  Private
exports.getAuditors = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    role: 'audit'
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Legals
// @route   GET /api/v1/users/lawyers
// @access  Private
exports.getLegals = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    role: 'legal'
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Admins
// @route   GET /api/v1/users/admins
// @access  Private
exports.getAdmins = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    role: 'admin'
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
  // const users = await User.find().cache({
  //   time: 10
  // });

  // res.status(200).json({
  //   success: true,
  //   count: users.length,
  //   data: users,
  // });
});

// @desc    Get single User
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // .populate({
  //   path: 'primaryAccount',
  //   select: 'primaryAccountNumber accountBalance',
  // }, {
  //   path: 'savingsAccount',
  //   select: 'savingsAccountNumber accountBalance',
  // });

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Get single User by username
// @route   GET /api/v1/users/:username
// @access  Private
// exports.getUserByUsername = asyncHandler(async (req, res, next) => {
//   const user = await User.findOne(req.params.username);

//   if (!user) {
//     return next(
//       new ErrorResponse(
//         `User not found with username of ${req.params.username}`,
//         404
//       )
//     );
//   }

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// @desc    Get single User by email
// @route   GET /api/v1/users/:email
// @access  Private
// exports.getUserByEmail = asyncHandler(async (req, res, next) => {
//   const user = await User.findOne(req.params.email);

//   if (!user) {
//     return next(
//       new ErrorResponse(
//         `User not found with email of ${req.params.email}`,
//         404
//       )
//     );
//   }

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// @desc    Create new User
// @route   POST /api/v1/users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  // const user = await User.create(req.body);
  const {
    username,
    firstname,
    lastname,
    email,
    phone,
    password
  } = req.body;

  // Create user
  const user = await User.create({
    username,
    firstname,
    lastname,
    email,
    phone,
    password,
  });

  // Auto Generate Primary & Savings Account
  let primaryAccountNumber = Number(11223145);
  let savingsAccountNumber = Number(11223145);
  let accountBalance = new Number(0);
  let userRef = user.id;

  // find the most recent primary account and select only accountNumber
  let query1 = await PrimaryAccount.findOne()
    // .sort('-createdAt')
    .limit(1)
    .sort('-createdAt')
    .select('primaryAccountNumber');

  // find the most recent savings account and select only accountNumber
  let query2 = await SavingsAccount.findOne()
    // .sort('-createdAt')
    .limit(1)
    .sort('-createdAt')
    .select('savingsAccountNumber');
  // console.log(query);

  if (query1 && query2) {
    // increment accountNumber
    primaryAccountNumber = ++query1.primaryAccountNumber;
    savingsAccountNumber = ++query2.savingsAccountNumber;
    // accountNumber = query.accountNumber + 1;

    // Generate Primary Account Number
    await PrimaryAccount.create({
      primaryAccountNumber,
      accountBalance,
      userRef,
    });

    // Generate Savings Account Number
    await SavingsAccount.create({
      savingsAccountNumber,
      accountBalance,
      userRef,
    });
  }

  clearKey(User.collection.collectionName);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Update User
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});