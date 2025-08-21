# Product Management

These endpoints are for managing products.

## Get All Products
**GET** `/api/products`

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "...",
      "name": "Sample Product",
      "price": 100
    }
  ],
  "message": "products fetched successfully",
  "success": true
}
```

## Get Product by ID
**GET** `/api/products/{productId}`

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "...",
    "name": "Sample Product",
    "price": 100,
    "description": "A sample product description."
  },
  "message": "Product fetched successfully",
  "success": true
}
```

## Add Product (Admin)
**POST** `/api/admin/products`

**Headers:**
```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```
**Body (form-data):**
- name: "New Product"
- price: 150
- description: "Description of the new product."
- category: "..."
- stock: 50
- image: (file)

**Success Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "...",
    "name": "New Product",
    "price": 150,
    "image": "http://res.cloudinary.com/..."
  },
  "message": "Product created successfully",
  "success": true
}
```

## Update Product (Admin)
**PATCH** `/api/admin/products/{productId}`

**Headers:**
```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```
**Body (form-data):**
- name: "Updated Product Name"

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "...",
    "name": "Updated Product Name"
  },
  "message": "Product updated successfully",
  "success": true
}
```

## Delete Product (Admin)
**DELETE** `/api/admin/products/{productId}`

**Headers:**
```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```
**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": null,
  "message": "Product deleted successfully",
  "success": true
}
```
