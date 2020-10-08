const express = require('express');
const {
  deposit
} = require('../controllers/primaryTransactions');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router.post('/deposit', protect, deposit);

module.exports = router;