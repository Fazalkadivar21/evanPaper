# Cart Management

These endpoints manage the user's shopping cart. All cart routes require JWT authentication.

## Get Cart
**GET** `/api/cart`

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
                "productId": {
                    "_id": "...",
                    "name": "...",
                    "price": 100
                },
                "quantity": 2
            }
        ]
    },
    "message": "Cart retrieved successfully",
    "success": true
}
```

## Add to Cart
**POST** `/api/cart/add`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
    "productId": "...",
    "quantity": 1
}
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
                "quantity": 3
            }
        ]
    },
    "message": "Product added to cart successfully",
    "success": true
}
```

## Update Cart
**PATCH** `/api/cart/update`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
    "productId": "...",
    "quantity": 5
}
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
                "quantity": 5
            }
        ]
    },
    "message": "Cart updated successfully",
    "success": true
}
```

## Apply Offer to Cart
**POST** `/api/cart/apply-offer`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
    "offerId": "..."
}
```
**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": {
        "total": 500,
        "discount": 50,
        "final": 450
    },
    "message": "Offer applied",
    "success": true
}
```

## Clear Cart
**DELETE** `/api/cart/delete`

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
        "items": []
    },
    "message": "Cart cleared",
    "success": true
}
```
