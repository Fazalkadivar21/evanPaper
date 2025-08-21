# Tag Management

This endpoint is for retrieving product tags.

## Get All Tags
**GET** `/api/tags`

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "...",
      "name": "Featured"
    },
    {
      "_id": "...",
      "name": "New Arrival"
    }
  ],
  "message": "Tags fetched successfully",
  "success": true
}
```
