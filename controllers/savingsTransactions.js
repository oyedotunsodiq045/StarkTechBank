const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const SavingsTransaction = require('../models/SavingsTransaction');
const SavingsAccount = require('../models/SavingsAccount');
const {
  sum,
  difference,
} = require('../utils/functions');

// @desc    Deposit
// @route   POST /api/v1/savingstransactions/deposit
// @access  Public
exports.deposit = asyncHandler(async (req, res, next) => {

  // let description = req.body.description;
  // let type = req.body.type;
  // let status = req.body.status;
  // let amount = req.body.amount;

  // Add User and Account to req body
  req.body.userRef = req.user.id;
  req.body.savingsAccountId = req.user.savingsAccountId;

  let transactions;
  let savingsAccount = await SavingsAccount.findById(req.body.savingsAccountId);
  // console.log(transactions);
  // console.log(savingsAccount.accountBalance + req.body.amount);

  if (savingsAccount) {
    savingsAccount.accountBalance += req.body.amount;
    // savingsAccount.accountBalance = sum(savingsAccount.accountBalance, req.body.amount);
    savingsAccount.save();

    //
    req.body.status = "Complete"
    req.body.availableBalance = savingsAccount.accountBalance;
    transactions = await SavingsTransaction.create(req.body);
  }

  res.status(201).json({
    success: true,
    data: transactions
  });
});

// @desc    Withdraw
// @route   POST /api/v1/savingstransactions/withdraw
// @access  Private
exports.withdraw = asyncHandler(async (req, res, next) => {

  // Add User and Account to req body
  req.body.userRef = req.user.id;
  req.body.savingsAccountId = req.user.savingsAccountId;

  let transactions;
  let savingsAccount = await SavingsAccount.findById(req.body.savingsAccountId);

  // Account Balance must be >= withdrawal amount
  if (savingsAccount.accountBalance >= req.body.amount) {
    savingsAccount.accountBalance -= req.body.amount;
    // savingsAccount.accountBalance = difference(savingsAccount.accountBalance, req.body.amount);
    savingsAccount.save();

    //
    req.body.status = "Complete"
    req.body.availableBalance = savingsAccount.accountBalance;
    transactions = await SavingsTransaction.create(req.body);
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