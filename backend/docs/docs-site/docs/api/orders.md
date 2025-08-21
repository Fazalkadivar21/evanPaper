# Order Management

These endpoints are for managing user orders. All order routes require JWT authentication.

## Create Order
**POST** `/api/orders`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
  "items": [
    {
      "productId": "...",
      "quantity": 2
    }
  ],
  "addressId": "..."
}
```
**Success Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "...",
    "userId": "...",
    "items": [
      {
        "productId": "...",
        "price": 100,
        "quantity": 2
      }
    ],
    "totalAmount": 200,
    "addressId": "...",
    "status": "placed",
    "paymentStatus": "pending"
  },
  "message": "Order placed successfully.",
  "success": true
}
```

## Get My Orders
**GET** `/api/orders`

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
      "totalAmount": 200,
      "status": "placed"
    }
  ],
  "message": "My orders",
  "success": true
}
```

## Get Order by ID
**GET** `/api/orders/{orderId}`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "...",
    "userId": "...",
    "items": [
      {
        "productId": "...",
        "price": 100,
        "quantity": 2
      }
    ],
    "totalAmount": 200,
    "addressId": "...",
    "status": "placed"
  },
  "message": "Order details",
  "success": true
}
```

## Cancel Order
**PUT** `/api/orders/{orderId}/cancel`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "...",
    "status": "cancelled"
  },
  "message": "Order cancelled",
  "success": true
}
```
