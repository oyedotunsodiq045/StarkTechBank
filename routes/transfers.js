const express = require('express');
const {
  transfer,
  transferOut
} = require('../controllers/transfers');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router.use(protect);

router.post('/', transfer);
router.post('/out', transferOut);

module.exports = router;