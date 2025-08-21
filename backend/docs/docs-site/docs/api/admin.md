# Admin Panel

These endpoints are for administrative purposes and require admin-level JWT authentication.

## Get All Users
**GET** `/api/admin/users`

**Headers:**
```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```
**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "...",
      "username": "johndoe",
      "email": "john.doe@example.com",
      "role": "user"
    }
  ],
  "message": "All users",
  "success": true
}
```
