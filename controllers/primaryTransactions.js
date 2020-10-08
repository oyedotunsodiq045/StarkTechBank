const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const PrimaryTransaction = require('../models/PrimaryTransaction');
const PrimaryAccount = require('../models/PrimaryAccount');

// @desc    Get all Notes
// @route   GET /notes
// @access  Public
exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find().populate({
    path: 'user',
    select: 'name'
  });

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

// @desc    Get single Note
// @route   GET /note/:id
// @access  Public
exports.getNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404))
    );
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc    Deposit
// @route   POST /api/v1/primarytransactions/deposit
// @access  Public
exports.deposit = asyncHandler(async (req, res, next) => {

  // let description = req.body.description;
  // let type = req.body.type;
  // let status = req.body.status;
  // let amount = req.body.amount;

  // Add User and Account to req body
  req.body.userRef = req.user.id;
  req.body.account = req.user.primaryAccountId;

  let transactions = await PrimaryTransaction.create(req.body);
  let primaryAccount = await PrimaryAccount.findById(req.body.account);
  // console.log(transactions);
  // console.log(primaryAccount.accountBalance + req.body.amount);

  if (primaryAccount) {
    primaryAccount.accountBalance += req.body.amount;
    primaryAccount.save();
  }

  res.status(201).json({
    success: true,
    data: transactions
  });
});

// @desc    Update Note
// @route   PUT /notes/:id
// @access  Public
exports.updateNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!note) {
    return next(
      next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404))
    );
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc    Delete Note
// @route   DELETE /notes/:id
// @access  Public
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) {
    return next(
      next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404))
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});