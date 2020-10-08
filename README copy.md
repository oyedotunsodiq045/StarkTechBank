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
|                                                                     | Sends Email                   |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/login                     | Login User                    |
|                                                                     | Sends Email                   |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/forgotpassword            | Forgot Password               |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/resetpassword/:resettoken | Reset Password                |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/me                  | Get Logged in User            |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/logout              | Logout User                   |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/updatedetails       | Update User Details           |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/updatepassword      | Update Password               |
|                                                                     |                               |
| CurrentAccount                                                      |                               |
|                                                                     |                               |
| SavingsAccount                                                      |                               |
|                                                                     |                               |
| PrimaryTransaction                                                  |                               |
|                                                                     |                               |
| SavingsTransaction                                                  |                               |
|                                                                     |                               |
| Appointment                                                         |                               |
|                                                                     |                               |
| Recipient                                                           |                               |
|                                                                     |                               |
| Users                                                               |                               |
|                                                                     |                               |
| Advanced Filtering                                                  |                               |
|                                                                     |                               |
| Select, Sorting                                                     |                               |
|                                                                     |                               |
| Pagination                                                          |                               |
|                                                                     |                               |