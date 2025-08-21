# Review Management

These endpoints are for managing product reviews.

## Add Review
**POST** `/api/reviews/{productId}`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
  "rating": 5,
  "comment": "This is a great product!"
}
```
**Success Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "...",
    "userId": "...",
    "productId": "...",
    "rating": 5,
    "comment": "This is a great product!"
  },
  "message": "Review added",
  "success": true
}
```

## Get Reviews for a Product
**GET** `/api/reviews/{productId}`

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "...",
      "rating": 5,
      "comment": "This is a great product!"
    }
  ],
  "message": "Reviews fetched",
  "success": true
}
```

## Delete Review
**DELETE** `/api/reviews/{reviewId}`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": null,
  "message": "Review deleted",
  "success": true
}
```
