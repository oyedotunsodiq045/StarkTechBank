const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const PrimaryTransaction = require('../models/PrimaryTransaction');
const PrimaryAccount = require('../models/PrimaryAccount');
const SavingsTransaction = require('../models/SavingsTransaction');
const SavingsAccount = require('../models/SavingsAccount');
const {
  sum,
  difference,
} = require('../utils/functions');

// @desc    Primary Account Deposit
// @route   POST /api/v1/transactions/primary/deposit
// @access  Private
exports.pryAcctDeposit = asyncHandler(async (req, res, next) => {

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

// @desc    Primary Account Withdrawal
// @route   POST /api/v1/transactions/primary/withdrawal
// @access  Private
exports.pryAcctWithdrawal = asyncHandler(async (req, res, next) => {

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

// @desc    Savings Account Deposit
// @route   POST /api/v1/transactions/savings/deposit
// @access  Public
exports.saveAcctDeposit = asyncHandler(async (req, res, next) => {

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

// @desc    Savings Account Withdrawal
// @route   POST /api/v1/transactions/savings/withdrawal
// @access  Private
exports.saveAcctWithdrawal = asyncHandler(async (req, res, next) => {

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

// Transfer - Between Accounts (Primary -> Savings and Vice Versa)
// /api/v1/transactions/transfer

// @desc    Transfer - Between Accounts (Primary -> Savings and Vice Versa)
// @route   POST /api/v1/transactions/transfer
// @access  Private
exports.transfer = asyncHandler(async (req, res, next) => {

  // Add User and Account to req body
  req.body.userRef = req.user.id;
  req.body.primaryAccountId = req.user.primaryAccountId;
  req.body.savingsAccountId = req.user.savingsAccountId;

  let transferFrom = req.body.type;
  let amount = req.body.amount;

  let transactions;
  let primaryAccount = await PrimaryAccount.findById(req.user.primaryAccountId);
  let savingsAccount = await SavingsAccount.findById(req.user.savingsAccountId);

  let primaryBalance = primaryAccount.accountBalance;
  // console.log(primaryBalance);
  let savingsBalance = savingsAccount.accountBalance;
  // console.log(savingsBalance);
  let primaryUpdatedBalance;
  let savingsUpdatedBalance;

  if (transferFrom === 'Primary') {
    // Account Balance must be >= withdrawal amount
    if (primaryBalance >= amount) {
      // Deduct amount from Primary Account
      primaryUpdatedBalance = primaryAccount.accountBalance -= amount;
      // primaryUpdatedBalance = difference(primaryAccount.accountBalance, amount);
      // console.log(primaryUpdatedBalance);
      primaryAccount.save();
      // Add Deducted amount to Savings Account
      savingsAccount.accountBalance += amount;
      // savingsAccount.accountBalance = sum(savingsAccount.accountBalance, amount);
      savingsAccount.save();
      // Update transaction status
      req.body.status = "Complete"
      req.body.description = `Transferred ${amount} from ${transferFrom} account to Savings account`;
      req.body.availableBalance = primaryUpdatedBalance;
      transactions = await PrimaryTransaction.create(req.body);
      // sendMail()
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
    if (savingsBalance >= amount) {
      // Deduct amount from Savings Account
      savingsUpdatedBalance = savingsAccount.accountBalance -= amount;
      // savingsUpdatedBalance = difference(savingsAccount.accountBalance, amount);
      // console.log(savingsUpdatedBalance);
      savingsAccount.save();
      // Add Deducted amount Primary Account
      primaryAccount.accountBalance += amount;
      // primaryAccount.accountBalance = sum(primaryAccount.accountBalance, amount);
      primaryAccount.save();
      // Update transaction status
      req.body.status = "Complete"
      req.body.description = `Transferred ${amount} from ${transferFrom} account to Primary account`;
      req.body.availableBalance = savingsUpdatedBalance;
      transactions = await SavingsTransaction.create(req.body);
      // sendMail()
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

// @desc    Transfer - To Someone else
// @route   POST /api/v1/transactions/transfer/out
// @access  Private
exports.transferOut = asyncHandler(async (req, res, next) => {

  // Add User and Account to req body
  req.body.userRef = req.user.id;
  req.body.primaryAccountId = req.user.primaryAccountId;
  req.body.savingsAccountId = req.user.savingsAccountId;

  let recipientAccountNumber = req.body.accountNumber;
  let recipientAccountType = req.body.type;
  let transferFrom = req.body.transferFrom;
  let amount = req.body.amount;

  // Check if accountNumber exist in PrimaryAccount and SavingsAccount
  let pryAccountExist = await PrimaryAccount.findOne({
    primaryAccountNumber: recipientAccountNumber
  }).populate({
    path: 'userRef',
    select: 'firstName lastName',
  });

  // console.log(pryAccountExist);
  let savAccountExist = await SavingsAccount.findOne({
    savingsAccountNumber: recipientAccountNumber
  }).populate({
    path: 'userRef',
    select: 'firstName lastName',
  });
  // console.log(savAccountExist);

  let transactions;
  let primaryAccount = await PrimaryAccount.findById(req.user.primaryAccountId);
  let savingsAccount = await SavingsAccount.findById(req.user.savingsAccountId);

  let primaryBalance = primaryAccount.accountBalance;
  // console.log(primaryBalance);
  let savingsBalance = savingsAccount.accountBalance;
  // console.log(savingsBalance);
  let primaryUpdatedBalance;
  let savingsUpdatedBalance;

  if (recipientAccountType === 'Primary' && pryAccountExist) {
    if (transferFrom === 'Primary') {
      // Account Balance must be >= withdrawal amount
      if (primaryBalance >= amount) {
        // Deduct amount from Primary Account
        primaryUpdatedBalance = primaryAccount.accountBalance -= amount;
        // primaryUpdatedBalance = difference(primaryAccount.accountBalance, amount);
        // console.log(primaryUpdatedBalance);
        primaryAccount.save();
        // Add Deducted amount to Sendee Primary Account
        pryAccountExist.accountBalance += amount;
        // pryAccountExist.accountBalance = sum(pryAccountExist.accountBalance, amount);
        pryAccountExist.save();
        // Update transaction status
        req.body.status = "Complete"
        req.body.description = `Transferred ${amount} from ${transferFrom} account to ${pryAccountExist.userRef.firstName} ${pryAccountExist.userRef.lastName} ${recipientAccountType} account`;
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
        savingsUpdatedBalance = savingsAccount.accountBalance -= amount;
        // savingsUpdatedBalance = difference(savingsAccount.accountBalance, amount);
        // console.log(savingsUpdatedBalance);
        savingsAccount.save();
        // Add Deducted amount to Sendee Savings Account
        pryAccountExist.accountBalance += amount;
        // pryAccountExist.accountBalance = sum(pryAccountExist.accountBalance, amount);
        pryAccountExist.save();
        // Update transaction status
        req.body.status = "Complete"
        req.body.description = `Transferred ${amount} from ${transferFrom} account to ${pryAccountExist.userRef.firstName} ${pryAccountExist.userRef.lastName} ${recipientAccountType} account`;
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
          `Invalid parameters`,
          404
        )
      );
    }

  } else if (recipientAccountType === 'Savings' && savAccountExist) {
    if (transferFrom === 'Primary') {
      // Account Balance must be >= withdrawal amount
      if (primaryBalance >= amount) {
        // Deduct amount from Primary Account
        primaryUpdatedBalance = primaryAccount.accountBalance -= req.body.amount;
        // primaryUpdatedBalance = difference(primaryAccount.accountBalance, req.body.amount);
        // console.log(primaryUpdatedBalance);
        primaryAccount.save();
        // Add Deducted amount to Sendee Primary Account
        savAccountExist.accountBalance += amount;
        // savAccountExist.accountBalance = sum(savAccountExist.accountBalance, amount);
        savAccountExist.save();
        // Update transaction status
        req.body.status = "Complete"
        req.body.description = `Transferred ${amount} from ${transferFrom} account to ${savAccountExist.userRef.firstName} ${savAccountExist.userRef.lastName} ${recipientAccountType} account`;
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
        // savingsUpdatedBalance = difference(savingsAccount.accountBalance, req.body.amount);
        // console.log(savingsUpdatedBalance);
        savingsAccount.save();
        // Add Deducted amount to Sendee Savings Account
        savAccountExist.accountBalance += amount;
        // savAccountExist.accountBalance = sum(savAccountExist.accountBalance, amount);
        savAccountExist.save();
        // Update transaction status
        req.body.status = "Complete"
        req.body.description = `Transferred ${amount} from ${transferFrom} account to ${savAccountExist.userRef.firstName} ${savAccountExist.userRef.lastName} ${recipientAccountType} account`;
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
          `Invalid parameters`,
          404
        )
      );
    }
  } else {
    return next(
      new ErrorResponse(
        `Sendee must be a StarkTechBank account holder`,
        400
      )
    );
  }

  res.status(201).json({
    success: true,
    data: transactions
  });
});