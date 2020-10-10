
# StarkTechBank



## Indices

* [Authentication](#authentication)

  * [Forgot Password](#1-forgot-password)
  * [Get Logged in User via Token](#2-get-logged-in-user-via-token)
  * [Login User](#3-login-user)
  * [Logout User](#4-logout-user)
  * [Register User](#5-register-user)
  * [Reset Password](#6-reset-password)
  * [Update  Password](#7-update--password)
  * [Update User Details](#8-update-user-details)

* [PrimaryTransaction](#primarytransaction)

  * [Primary Account Deposit](#1-primary-account-deposit)
  * [Primary Account Withdrawal](#2-primary-account-withdrawal)

* [Recipient](#recipient)

  * [Create Recipient](#1-create-recipient)
  * [Delete a Recipient](#2-delete-a-recipient)
  * [Get a Recipient](#3-get-a-recipient)
  * [Get all Recipients](#4-get-all-recipients)
  * [Update a Recipient](#5-update-a-recipient)

* [SavingsTransaction](#savingstransaction)

  * [Savings Account Deposit](#1-savings-account-deposit)
  * [Savings Account Withdrawal](#2-savings-account-withdrawal)

* [Transfers](#transfers)

  * [Transfers Between Account - Primary to Savings](#1-transfers-between-account---primary-to-savings)
  * [Transfers Between Account - Savings to Primary](#2-transfers-between-account---savings-to-primary)

* [Users](#users)

  * [Create User](#1-create-user)
  * [Delete a User](#2-delete-a-user)
  * [Get a User](#3-get-a-user)
  * [Get all Users](#4-get-all-users)
  * [Update a User](#5-update-a-user)


--------


## Authentication



### 1. Forgot Password


Generate password token and send email


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/forgotpassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "email": "oyedotunsodiq045@yahoo.com"
}
```



### 2. Get Logged in User via Token



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/auth/me
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



### 3. Login User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "userName": "oyedotunsodiq045",
    "password": "123456"
}
```



### 4. Logout User


Clear user token


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/auth/logout
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



### 5. Register User


Register a User, Auto creates Savings and Primary Account


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "userName": "abbey",
    "firstName": "Abiodun",
    "lastName": "Omogbolahan",
    "email": "oyedotunsodiq045@yahoo.com",
    "phone": "07058924457",
    "password": "123456"
}
```



### 6. Reset Password


Reset user password using token


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/resetpassword/52f0e1e7291ff23cf390dd8a96cd3ecb0d5e60e9
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "password": "1234567"
}
```



### 7. Update  Password



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatepassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "currentPassword": "1234567",
    "newPassword": "123456"
}
```



### 8. Update User Details



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatedetails
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "userName": "abbey",
    "firstName": "Abiodun Omogbolahan",
    "lastName": "Oyedotun",
    "email": "oyedotunsodiq045@yahoo.com",
    "phone": "07058924457"
}
```



## PrimaryTransaction



### 1. Primary Account Deposit



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/primaryTransactions/deposit
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "description": "Primary Account Deposit",
    "type": "Primary",
    "amount": 1000
}
```



### 2. Primary Account Withdrawal



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/primaryTransactions/withdraw
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "description": "Primary Account Withdrawal",
    "type": "Primary",
    "amount": 285
}
```



## Recipient



### 1. Create Recipient


Recipient must be an account holder


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/recipients
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name": "Ifeoluwa Adebabe",
    "email": "adebabesemedeton@gmail.com",
    "phone": "08189414781",
    "accountNumber": "11223147",
    "description": "Fiancee"
}
```



### 2. Delete a Recipient


Delete a Recipient. Admin only


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/recipients/5f81a23d1e188720064ca841
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



### 3. Get a Recipient



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/recipients/5f819b69f167321f38772c05
```



### 4. Get all Recipients


Get all Recipients data. Admin only


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/recipients
```



### 5. Update a Recipient


Update recipient data. Admin only


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/recipients/5f819b69f167321f38772c05
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "email": "adebabesemedeton@gmail.com"
}
```



## SavingsTransaction



### 1. Savings Account Deposit



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/savingsTransactions/deposit
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "description": "Savings Account Deposit",
    "type": "Savings",
    "amount": 1000
}
```



### 2. Savings Account Withdrawal



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/savingsTransactions/withdraw
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "description": "Savings Account Withdrawal",
    "type": "Savings",
    "amount": 1050
}
```



## Transfers



### 1. Transfers Between Account - Primary to Savings


Make transaction between primary and savings accounts (vice versa)


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/transfers
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "description": "Transfer to Savings Account",
    "type": "Primary",
    "amount": 100
}
```



### 2. Transfers Between Account - Savings to Primary


Make transaction between primary and savings accounts (vice versa)


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/transfers
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "description": "Transfer to Primary Account",
    "type": "Savings",
    "amount": 390
}
```



## Users



### 1. Create User


Add user to database (admin)


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "userName": "test",
    "firstName": "Test",
    "lastName": "Microphone",
    "email": "test@gmail.com",
    "phone": "08123456789",
    "password": "123456"
}
```



### 2. Delete a User


Delete a user from database (admin)


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/users/5f7e592e078929412a34a955
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



### 3. Get a User


Get a user by id (admin)


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/5f7df53b25f6723e4802cf2f
```



### 4. Get all Users


Get all users (admin)


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users
```



### 5. Update a User


Update a user by id (admin)


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/users/5f7df53b25f6723e4802cf2f
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "email": "adebabesemedeton@gmail.com"
}
```



---
[Back to top](#starktechbank)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-10-10 13:20:45 by [docgen](https://github.com/thedevsaddam/docgen)
