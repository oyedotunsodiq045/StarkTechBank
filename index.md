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

### Credentials (Admin purpose)

| username         | email                      | password |
| ---------------- | -------------------------- | -------- |
| oyedotunsodiq045 | oyedotunsodiq045@gmail.com | 123456   |
| ifeoye           | adebabesemedeton@gmail.com | 123456   |
| test             | tester@gmail.com           | 123456   |
|                  |                            |          |

### Testing

| Routes                                                               | Description                   |
| -------------------------------------------------------------------- | ----------------------------- |
| Authentication                                                       |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/register                   | Register User                 |
|                                                                      | Auto-Generate Primary Account |
|                                                                      | Auto-Generate Savings Account |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/login                      | Login User                    |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/forgotpassword             | Forgot Password               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/resetpassword/:resettoken  | Reset Password                |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/me                   | Get Logged in User            |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/logout               | Logout User                   |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/updatedetails        | Update User Details           |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/updatepassword       | Update Password               |
|                                                                      |                               |
| Transactions                                                         |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/transactions/deposit            | Deposit v3                    |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/transactions/withdrawal         | Withdrawal v3                 |
|                                                                      |                               |
| Transfers                                                            |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/transfers                       | Transfer Between Account      |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/transfers/out                   | Transfer To Someone else      |
|                                                                      |                               |
| Users                                                                |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/users                           | Create User                   |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users                     | Get all Users                 |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users/:id                 | Get a User                    |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users/:id                 | Update User                   |
| DELETE &nbsp;url/api/v1/users/:id                                    | Delete User                   |
|                                                                      |                               |
| Recipient                                                            |                               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/recipients                      | Create Recipient              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/recipients                | Get all Recipients            |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/recipients/:id            | Get a Recipient               |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/recipients/:id            | Update Recipient              |
| DELETE &nbsp;url/api/v1/recipients/:id                               | Delete Recipient              |
|                                                                      |                               |
| Appointment                                                          |                               |
|                                                                      |                               |
