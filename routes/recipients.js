const express = require('express');
const {
  getRecipients,
  getRecipient,
  createRecipient,
  updateRecipient,
  deleteRecipient
} = require('../controllers/recipients');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .get(getRecipients)
  .post(createRecipient);

router
  .route('/:id')
  .get(getRecipient)
  .put(updateRecipient)
  .delete(deleteRecipient);

module.exports = router;