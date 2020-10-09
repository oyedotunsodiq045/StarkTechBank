const express = require('express');
const {
  transfer
} = require('../controllers/transfers');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router.post('/', protect, transfer);

module.exports = router;