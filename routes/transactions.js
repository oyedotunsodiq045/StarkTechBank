const express = require('express');
const {
  pryAcctDeposit,
  pryAcctWithdrawal,
  saveAcctDeposit,
  saveAcctWithdrawal,
  transfer,
  transferOut
} = require('../controllers/transactions');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router.use(protect);

// Primary Account Deposit
// /api/v1/transactions/primary/deposit
router.post('/primary/deposit', pryAcctDeposit);

// Primary Account Withdrawal
// /api/v1/transactions/primary/withdrawal
router.post('/primary/withdrawal', pryAcctWithdrawal);

// Savings Account Deposit
// /api/v1/transactions/savings/deposit
router.post('/savings/deposit', saveAcctDeposit);

// Savings Account Withdrawal
// /api/v1/transactions/savings/withdrawal
router.post('/savings/withdrawal', saveAcctWithdrawal);

// Transfer - Between Accounts (Primary -> Savings and Vice Versa)
// /api/v1/transactions/transfer
router.post('/transfer', transfer);

// Transfer - To Someone else
// /api/v1/transactions/transfer/out
router.post('/transfer/out', transferOut);

module.exports = router;