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
|                                                                     | Auto-Generate Current Account |
|                                                                     | Auto-Generate Savings Account |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/login                     | Login User                    |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/forgotpassword            | Forgot Password               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/resetpassword/:resettoken | Reset Password                |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/me                  | Get Logged in User            |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/logout              | Logout User                   |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/updatedetails       | Update User Details           |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/updatepassword      | Update Password               |
|                                                                     |                               |
| PrimaryAccount                                                      |                               |
|                                                                     |                               |
| SavingsAccount                                                      |                               |
|                                                                     |                               |
| PrimaryTransaction                                                  |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/primaryTransactions/deposit    | Primary Account Deposit       |
|                                                                     |                               |
| SavingsTransaction                                                  |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/savingsTransactions/deposit    | Savings Account Deposit       |
|                                                                     |                               |
| Appointment                                                         |                               |
|                                                                     |                               |
| Recipient                                                           |                               |
|                                                                     |                               |
| Users                                                               |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/users                          | Create User                   |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users                    | Get all User                  |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users/:id                | Get a User                    |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users/:id                | Update User                   |
| DELETE &nbsp;url/api/v1/users/:id                                   | Delete User                   |
|                                                                     |                               |
| Advanced Filtering                                                  |                               |
|                                                                     |                               |
| Select, Sorting                                                     |                               |
|                                                                     |                               |
| Pagination                                                          |                               |
|                                                                     |                               |
