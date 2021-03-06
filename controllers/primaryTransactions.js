const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const PrimaryTransaction = require('../models/PrimaryTransaction');
const PrimaryAccount = require('../models/PrimaryAccount');
const {
  sum,
  difference,
} = require('../utils/functions');

// @desc    Deposit
// @route   POST /api/v1/primarytransactions/deposit
// @access  Private
exports.deposit = asyncHandler(async (req, res, next) => {

  // let description = req.body.description;
  // let type = req.body.type;
  // let status = req.body.status;
  // let amount = req.body.amount;

  // Add User and Account to req body
  req.body.userRef = req.user.id;
  req.body.primaryAccountId = req.user.primaryAccountId;

  let transactions;
  let primaryAccount = await PrimaryAccount.findById(req.body.primaryAccountId);
  // console.log(transactions);
  // console.log(primaryAccount.accountBalance + req.body.amount);

  if (primaryAccount) {
    primaryAccount.accountBalance += req.body.amount;
    // primaryAccount.accountBalance = sum(primaryAccount.accountBalance, req.body.amount);
    primaryAccount.save();

    //
    req.body.status = "Complete"
    req.body.availableBalance = primaryAccount.accountBalance;
    transactions = await PrimaryTransaction.create(req.body);
  }

  res.status(201).json({
    success: true,
    data: transactions
  });
});

// @desc    Withdraw
// @route   POST /api/v1/primarytransactions/withdraw
// @access  Private
exports.withdraw = asyncHandler(async (req, res, next) => {

  // Add User and Account to req body
  req.body.userRef = req.user.id;
  req.body.primaryAccountId = req.user.primaryAccountId;

  let transactions;
  let primaryAccount = await PrimaryAccount.findById(req.body.primaryAccountId);

  // Account Balance must be >= withdrawal amount
  if (primaryAccount.accountBalance >= req.body.amount) {
    primaryAccount.accountBalance -= req.body.amount;
    // primaryAccount.accountBalance = difference(primaryAccount.accountBalance, req.body.amount);
    primaryAccount.save();

    //
    req.body.status = "Complete"
    req.body.availableBalance = primaryAccount.accountBalance;
    transactions = await PrimaryTransaction.create(req.body);
  } else {
    return next(
      new ErrorResponse(
        `Insufficient funds`,
        404
      )
    );
  }

  res.status(201).json({
    success: true,
    data: transactions
  });
});