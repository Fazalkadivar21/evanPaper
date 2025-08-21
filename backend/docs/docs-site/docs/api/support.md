# Support Ticket Management

These endpoints are for managing support tickets. All support routes require JWT authentication.

## Create Support Ticket
**POST** `/api/support`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
  "orderId": "...",
  "issueType": "Delivery",
  "description": "My order has not arrived yet."
}
```
**Success Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "...",
    "userId": "...",
    "issueType": "Delivery",
    "description": "My order has not arrived yet.",
    "status": "open"
  },
  "message": "Ticket created",
  "success": true
}
```

## Get My Tickets
**GET** `/api/support`

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
      "issueType": "Delivery",
      "status": "open"
    }
  ],
  "message": "My tickets",
  "success": true
}
```

## Get Ticket by ID
**GET** `/api/support/{ticketId}`

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
    "issueType": "Delivery",
    "description": "My order has not arrived yet.",
    "status": "open"
  },
  "message": "Ticket details",
  "success": true
}
```
