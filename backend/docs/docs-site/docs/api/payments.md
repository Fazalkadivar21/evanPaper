# Payment Management

These endpoints are for handling payments. All payment routes require JWT authentication.

## Initiate Payment
**POST** `/api/payments/initiate`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
  "orderId": "..."
}
```
**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "razorpayOrder": {
      "id": "order_xxxxxxxxxxxxxx",
      "entity": "order",
      "amount": 20000,
      "currency": "INR",
      "receipt": "..."
    }
  },
  "message": "Payment initiated",
  "success": true
}
```

## Verify Payment
**POST** `/api/payments/verify`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Body:**
```json
{
  "orderId": "...",
  "razorpay_payment_id": "...",
  "razorpay_order_id": "...",
  "razorpay_signature": "..."
}
```
**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": null,
  "message": "Payment verified and order updated",
  "success": true
}
```
