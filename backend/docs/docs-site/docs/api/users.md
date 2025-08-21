# User Management

These endpoints are for managing user accounts and authentication.

## Register User
**POST** `/api/users/register`

**Body:**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "password123"
}
```
**Success Response (201):**
```json
{
    "statusCode": 201,
    "data": {
        "_id": "...",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "role": "user"
    },
    "message": "Registration successful",
    "success": true
}
```

## Login User
**POST** `/api/users/login`

**Body:**
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```
**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "...",
            "name": "John Doe",
            "email": "john.doe@example.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "message": "Login successful",
    "success": true
}
```

## Logout User
**POST** `/api/users/logout`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": null,
    "message": "Logout successful",
    "success": true
}
```

## Update User
**POST** `/api/users/update`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
    "name": "Johnathan Doe"
}
```
**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": {
        "_id": "...",
        "name": "Johnathan Doe",
        "email": "john.doe@example.com"
    },
    "message": "User updated successfully",
    "success": true
}
```
