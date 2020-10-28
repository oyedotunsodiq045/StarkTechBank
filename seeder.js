const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Load models
const User = require('./models/User');
const PrimaryAccount = require('./models/PrimaryAccount');
const SavingsAccount = require('./models/SavingsAccount');
const PrimaryTransaction = require('./models/PrimaryTransaction');
const SavingsTransaction = require('./models/SavingsTransaction');
const Recipient = require('./models/Recipient');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
// mongoose.connect(process.env.LOCAL_MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

// Read JSON files
// PrimaryAccount
const primaryaccounts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/primaryaccounts.json`, 'utf-8')
);

// SavingsAccount
const savingsaccounts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/savingsaccounts.json`, 'utf-8')
);

// PrimaryTransaction
const primarytransactions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/primarytransactions.json`, 'utf-8')
);

// SavingsTransaction
const savingstransactions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/savingstransactions.json`, 'utf-8')
);

// Recipient
const recipients = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/recipients.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await PrimaryAccount.create(primaryaccounts);
    await SavingsAccount.create(savingsaccounts);
    await PrimaryTransaction.create(primarytransactions);
    await SavingsTransaction.create(savingstransactions);
    await Recipient.create(recipients);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await PrimaryAccount.deleteMany();
    await SavingsAccount.deleteMany();
    await PrimaryTransaction.deleteMany();
    await SavingsTransaction.deleteMany();
    await Recipient.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}