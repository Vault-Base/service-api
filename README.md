# API Documentation

## **Introduction**
This API provides services for key-value caching, file uploads, and secure data retrieval.

- **Key-Value Caching Services:** Supports setting and getting key-value pairs with optional TTL (Time To Live) for expiration.
- **Storage Services:** Supports secure image uploads and retrieval.

## **Base URL**
```
http://<your-server-hostname>
```

## **Endpoints**

### **Key-Value Caching**

#### **Set Key-Value Pair**
**POST** `api/caching/set`

**Request Body:**
```json
{
  "uid": "string",
  "key": "string",
  "value": "any",
  "ttl": "integer (optional, in milliseconds)"
}
```

**Response:**
```json
{
  "message": "Stored: <key> => <value> for user: <uid>, TTL: <ttl>"
}
```

**Errors:**
- `400 Bad Request`: UID, key, and value are required.
- `500 Internal Server Error`: Error saving to the database.

#### **Get Key-Value Pair**
**GET** `api/caching/get/:uid/:key`

**Response:**
```json
{
  "key": "string",
  "value": "any"
}
```

**Errors:**
- `404 Not Found`: Key not found or expired.
- `500 Internal Server Error`: Error retrieving from the database.

---

### **Storage Services**

#### **Upload File**
**POST** `api/storage/upload-file`

**Headers:**
```
Authorization: <secret_key>
```

**Request Body:** (multipart/form-data)
| Key  | Type   | Description            |
|------|--------|------------------------|
| file | File   | The file to be uploaded |
| uid  | String | Unique user identifier  |

**Response:**
```json
{
  "message": "File uploaded successfully",
  "key": "string",
  "fileUrl": "string"
}
```

**Errors:**
- `400 Bad Request`: No file uploaded or missing UID.
- `500 Internal Server Error`: File storage issue.

#### **Get File**
**GET** `api/storage/get-file`

**Headers:**
```
Authorization: <secret_key>
```

**Request Body:**
```json
{
  "uid": "string",
  "key": "string"
}
```

**Response:**
```json
{
  "message": "File retrieved successfully",
  "fileUrl": "string"
}
```

**Errors:**
- `400 Bad Request`: No key provided.
- `404 Not Found`: Key not found.

---

## **Middleware**

### **Protect Middleware**
- Validates requests by checking the authorization header.
- The header value must match the environment variable `SECRET_KEY`.

## **Example Environment Variable**
```
SECRET_KEY=
```

