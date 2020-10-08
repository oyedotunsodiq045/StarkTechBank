const express = require('express');
const {
  deposit,
  withdraw
} = require('../controllers/savingsTransactions');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router.post('/deposit', protect, deposit);
router.post('/withdraw', protect, withdraw);

module.exports = router;