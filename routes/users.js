const express = require('express');
const {
  getThisMonthRegisteredUsers,
  getThisWeekRegisteredUsers,
  getTodayRegisteredUsers,
  getMarketers,
  getAccountants,
  getAuditors,
  getLegals,
  getAdmins,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const {
  protect,
  authorize
} = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/month')
  .get(getThisMonthRegisteredUsers);

router
  .route('/week')
  .get(getThisWeekRegisteredUsers);

router
  .route('/today')
  .get(getTodayRegisteredUsers);

router
  .route('/marketers')
  .get(getMarketers);

router
  .route('/accountants')
  .get(getAccountants);

router
  .route('/auditors')
  .get(getAuditors);

router
  .route('/legals')
  .get(getLegals);

router
  .route('/admins')
  .get(getAdmins);

router
  .route('/')
  .get(advancedResults(User, 'primaryAccount savingsAccount'), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;