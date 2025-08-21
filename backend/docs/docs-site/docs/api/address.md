# Address Management

These endpoints manage user addresses. All address routes require JWT authentication.

## Get Addresses
**GET** `/api/address`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "...",
            "userId": "...",
            "name": "...",
            "line1": "...",
            "line2": "...",
            "city": "...",
            "state": "...",
            "pincode": "...",
            "country": "...",
            "isDefault": true
        }
    ],
    "message": "Addresses retrieved successfully",
    "success": true
}
```

## Add Address
**POST** `/api/address`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
    "name": "Jane Doe",
    "line1": "456 Oak Ave",
    "city": "Otherville",
    "state": "Otherstate",
    "pincode": "654321",
    "country": "India",
    "isDefault": false
}
```
**Success Response (201):**
```json
{
    "statusCode": 201,
    "data": {
        "_id": "...",
        "userId": "...",
        "name": "Jane Doe",
        "line1": "456 Oak Ave",
        "line2": null,
        "city": "Otherville",
        "state": "Otherstate",
        "pincode": "654321",
        "country": "India",
        "isDefault": false
    },
    "message": "Address added successfully",
    "success": true
}
```

## Update Address
**PATCH** `/api/address/update`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
    "addressId": "...",
    "name": "Jane Smith",
    "isDefault": true
}
```
**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": {
        "_id": "...",
        "userId": "...",
        "name": "Jane Smith",
        "line1": "456 Oak Ave",
        "line2": null,
        "city": "Otherville",
        "state": "Otherstate",
        "pincode": "654321",
        "country": "India",
        "isDefault": true
    },
    "message": "Address updated successfully",
    "success": true
}
```

## Delete Address
**DELETE** `/api/address/delete`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
    "addressId": "..."
}
```
**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": null,
    "message": "Address deleted successfully",
    "success": true
}
```
