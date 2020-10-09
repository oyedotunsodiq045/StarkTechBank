# StarkTechBank

> StarkTechBank API.

## Quick Start

```bash
# Install dependencies
npm i

# Install dev-dependencies
npm i -D nodemon

# Serve on localhost:3000 (development)
npm run dev

# Serve on localhost:3000 (production)
npm start

# Import sample data into mongodb
node seeder -i

# Delete data from mongodb
node seeder -d
```

### Instruction

| Note                                                            |
| --------------------------------------------------------------- |
| URL &nbsp; &nbsp; &nbsp; &nbsp; https://starktechbank.glitch.me |
|                                                                 |

### Testing

| Routes                                                              | Description                   |
| ------------------------------------------------------------------- | ----------------------------- |
| Authentication                                                      |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/register                  | Register User                 |
|                                                                     | Auto-Generate Primary Account |
|                                                                     | Auto-Generate Savings Account |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/login                     | Login User                    |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/forgotpassword            | Forgot Password               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/resetpassword/:resettoken | Reset Password                |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/me                  | Get Logged in User            |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/logout              | Logout User                   |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/updatedetails       | Update User Details           |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/updatepassword      | Update Password               |
|                                                                     |                               |
| PrimaryTransaction                                                  |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/primaryTransactions/deposit    | Primary Account Deposit       |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/primaryTransactions/withdraw   | Primary Account Withdrawal    |
|                                                                     |                               |
| SavingsTransaction                                                  |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/savingsTransactions/deposit    | Savings Account Deposit       |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/savingsTransactions/withdraw   | Savings Account Withdrawal    |
|                                                                     |                               |
| Transfers                                                           |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/transfers                      | Transfer Between Account      |
|                                                                     |                               |
| Users                                                               |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/users                          | Create User                   |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users                    | Get all User                  |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users/:id                | Get a User                    |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users/:id                | Update User                   |
| DELETE &nbsp;url/api/v1/users/:id                                   | Delete User                   |
|                                                                     |                               |
| PrimaryAccount                                                      |                               |
|                                                                     |                               |
| SavingsAccount                                                      |                               |
|                                                                     |                               |
| Appointment                                                         |                               |
|                                                                     |                               |
| Recipient                                                           |                               |
|                                                                     |                               |
| Advanced Filtering                                                  |                               |
|                                                                     |                               |
| Select, Sorting                                                     |                               |
|                                                                     |                               |
| Pagination                                                          |                               |
|                                                                     |                               |
