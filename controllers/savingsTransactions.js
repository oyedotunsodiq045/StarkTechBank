const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const SavingsTransaction = require('../models/SavingsTransaction');
const SavingsAccount = require('../models/SavingsAccount');

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
  req.body.account = req.user.savingsAccountId;

  let transactions = await SavingsTransaction.create(req.body);
  let savingsAccount = await SavingsAccount.findById(req.body.account);
  // console.log(transactions);
  // console.log(savingsAccount.accountBalance + req.body.amount);

  if (savingsAccount) {
    savingsAccount.accountBalance += req.body.amount;
    savingsAccount.save();
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
  req.body.account = req.user.savingsAccountId;

  let transactions = await SavingsTransaction.create(req.body);
  let savingsAccount = await SavingsAccount.findById(req.body.account);

  // Account Balance must be >= withdrawal amount
  if (savingsAccount.accountBalance >= req.body.amount) {
    savingsAccount.accountBalance -= req.body.amount;
    savingsAccount.save();
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