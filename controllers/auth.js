const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const PrimaryAccount = require('../models/PrimaryAccount');
const SavingsAccount = require('../models/SavingsAccount');
const sendEmail = require('../utils/sendEmail');
const {
	clearKey
} = require('../middleware/cache');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
	const {
		username,
		firstname,
		lastname,
		email,
		phone,
		password
	} = req.body;

	const userExist = await User.findOne({ username, email })

	if (userExist) {
		return next(new ErrorResponse(`User already exist`, 404));
	}

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
		.sort('-createdAt')
		.select('primaryAccountNumber');
	// console.log(query1);

	// find the most recent savings account and select only accountNumber
	let query2 = await SavingsAccount.findOne()
		.sort('-createdAt')
		.select('savingsAccountNumber');
	// console.log(query2);

	if (query1 && query2) {
		// increment primaryAccountNumber && savingsAccountNumber
		primaryAccountNumber = ++query1.primaryAccountNumber;
		savingsAccountNumber = ++query2.savingsAccountNumber;

		// Generate Primary Account Number
		const primaryAccount = await PrimaryAccount.create({
			primaryAccountNumber,
			accountBalance,
			userRef,
		});

		// Generate Savings Account Number
		const savingsAccount = await SavingsAccount.create({
			savingsAccountNumber,
			accountBalance,
			userRef,
		});

		// Update PrimaryAccount on User
		user.primaryAccountId = primaryAccount.id;
		// Update SavingsAccount on User
		user.savingsAccountId = savingsAccount.id;
		user.save();
	}

	clearKey(User.collection.collectionName);

	sendTokenResponse(user, 200, res);
});

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({
		email: req.body.email,
	});

	if (!user) {
		return next(new ErrorResponse(`There is no user with that email`, 404));
	}

	// Generate reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({
		validateBeforeSave: false,
	});

	// Create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/auth/resetpassword/${resetToken}`;

	const message = `You're receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message,
		});

		res.status(200).json({
			success: true,
			data: 'Email sent',
		});
	} catch (err) {
		console.log(err);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({
			validateBeforeSave: false,
		});

		return next(new ErrorResponse(`Email could not be sent`, 500));
	}
});

// @desc    Reset Password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Private
exports.resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: {
			$gt: Date.now()
		}
	});

	if (!user) {
		return next(new ErrorResponse(`Invalid token`, 400));
	}

	// Set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Private
exports.login = asyncHandler(async (req, res, next) => {
	const {
		username,
		password
	} = req.body;

	// Validate username & login
	if (!username || !password) {
		return next(
			new ErrorResponse(`Please provide a username and password`, 400)
		);
	}

	// Check for user
	const user = await User.findOne({
		username,
	}).select('+password');

	if (!user) {
		return next(new ErrorResponse(`Invalid credentials`, 401));
	}

	// Check if password match
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse(`Invalid credentials`, 401));
	}

	sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	})

	res.status(200).json({
		success: true,
		data: {}
	});
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).populate([{
		path: 'primaryAccountId',
		select: {
			primaryAccountNumber: 1,
			accountBalance: 1
		},
	}, {
		path: 'savingsAccountId',
		select: 'savingsAccountNumber accountBalance',
	}]).cache({
		time: 10
	});

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
	const fieldsToUpdate = {
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
	};

	const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	// Check current password
	if (!(await user.matchPassword(req.body.currentPassword))) {
		return next(new ErrorResponse(`Password is incorrect`, 401));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV == 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		// user: user,
		token
	});
};