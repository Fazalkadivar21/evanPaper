# Offer Management

These endpoints manage promotional offers.

## Get Active Offers
**GET** `/api/offers`

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "...",
      "title": "10% Off",
      "description": "Get 10% off on all products",
      "discountType": "%",
      "discountValue": 10,
      "validFrom": "2025-01-01T00:00:00.000Z",
      "validTo": "2025-12-31T23:59:59.999Z"
    }
  ],
  "message": "Active offers fetched successfully.",
  "success": true
}
```
