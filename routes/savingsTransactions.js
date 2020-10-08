const express = require('express');
const {
  deposit
} = require('../controllers/savingsTransactions');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router.post('/deposit', protect, deposit);

module.exports = router;