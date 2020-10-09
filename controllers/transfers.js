const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const PrimaryTransaction = require('../models/PrimaryTransaction');
const PrimaryAccount = require('../models/PrimaryAccount');
const SavingsTransaction = require('../models/SavingsTransaction');
const SavingsAccount = require('../models/SavingsAccount');

// @desc    Transfer Between Account - Primary to Savings (vice versa)
// @route   POST /api/v1/transfer
// @access  Private
exports.transfer = asyncHandler(async (req, res, next) => {

  // Add User and Account to req body
  req.body.userRef = req.user.id;
  req.body.primaryAccountId = req.user.primaryAccountId;
  req.body.savingsAccountId = req.user.savingsAccountId;

  let transferFrom = req.body.type;

  let transactions;
  let primaryAccount = await PrimaryAccount.findById(req.user.primaryAccountId);
  let savingsAccount = await SavingsAccount.findById(req.user.savingsAccountId);

  let primaryBalance = primaryAccount.accountBalance;
  // console.log(primaryBalance);
  let savingsBalance = savingsAccount.accountBalance;
  console.log(savingsBalance);
  let primaryUpdatedBalance;
  let savingsUpdatedBalance;

  if (transferFrom === 'Primary') {
    // Account Balance must be >= withdrawal amount
    if (primaryBalance >= req.body.amount) {
      // Deduct amount from Primary Account
      primaryUpdatedBalance = primaryAccount.accountBalance -= req.body.amount;
      // console.log(primaryUpdatedBalance);
      primaryAccount.save();
      // Add Deducted amount to Savings Account
      savingsAccount.accountBalance += req.body.amount;
      savingsAccount.save();
      // Update transaction status
      req.body.status = "Complete"
      req.body.availableBalance = primaryUpdatedBalance;
      transactions = await PrimaryTransaction.create(req.body);
    } else {
      return next(
        new ErrorResponse(
          `Insufficient funds`,
          404
        )
      );
    }
  } else if (transferFrom === 'Savings') {
    // Account Balance must be >= withdrawal amount
    if (savingsBalance >= req.body.amount) {
      // Deduct amount from Savings Account
      savingsUpdatedBalance = savingsAccount.accountBalance -= req.body.amount;
      // console.log(savingsUpdatedBalance);
      savingsAccount.save();
      // Add Deducted amount Primary Account
      primaryAccount.accountBalance += req.body.amount;
      primaryAccount.save();
      // Update transaction status
      req.body.status = "Complete"
      req.body.availableBalance = savingsUpdatedBalance;
      transactions = await SavingsTransaction.create(req.body);
    } else {
      return next(
        new ErrorResponse(
          `Insufficient funds`,
          404
        )
      );
    }
  } else {
    return next(
      new ErrorResponse(
        `Insufficient parameters`,
        404
      )
    );
  }

  res.status(201).json({
    success: true,
    data: transactions
  });
});