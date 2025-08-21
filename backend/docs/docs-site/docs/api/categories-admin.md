# Category Management (Admin)

These endpoints manage product categories as an admin.

## Add Category (Admin)
**POST** `/api/admin/category`

**Headers:**
```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```
**Body:**
```json
{
    "name": "Clothing"
}
```
**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": {
        "_id": "...",
        "name": "Clothing"
    },
    "message": "Category created successfully",
    "success": true
}
```

## Delete Category (Admin)
**DELETE** `/api/admin/category`

**Headers:**
```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```
**Body:**
```json
{
    "categoryId": "..."
}
```
**Success Response (200):**
```json
{
    "statusCode": 200,
    "data": null,
    "message": "Category deleted successfully",
    "success": true
}
```
