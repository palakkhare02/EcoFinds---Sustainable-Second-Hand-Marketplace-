# EcoFinds Backend API

A comprehensive REST API for the EcoFinds sustainable second-hand marketplace built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration, login, and profile management
- **Product Management**: Full CRUD operations for products with image upload support
- **Search & Filtering**: Advanced search with category, price range, and location filters
- **File Upload**: Multer-based image upload with validation
- **Security**: Password hashing, rate limiting, CORS, and input validation
- **Database**: MongoDB with Mongoose ODM for data persistence

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecofinds-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecofinds
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Create uploads directory**
   ```bash
   mkdir uploads
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 👤 User Endpoints

### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "location": "Delhi, India",
  "bio": "Eco-friendly enthusiast"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "location": "Delhi, India",
      "bio": "Eco-friendly enthusiast",
      "role": "user",
      "createdAt": "2023-09-05T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "location": "Mumbai, India",
  "bio": "Updated bio"
}
```

### Change Password
```http
PUT /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

### Get User by ID
```http
GET /api/users/:id
```

### Delete Account
```http
DELETE /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "password123"
}
```

---

## 🛍️ Product Endpoints

### Get All Products
```http
GET /api/products?page=1&limit=12&search=laptop&category=eco-gadgets&minPrice=1000&maxPrice=5000&location=delhi&sortBy=price&sortOrder=asc
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)
- `search`: Search term for title, description, or tags
- `category`: Filter by category
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `location`: Filter by location
- `sortBy`: Sort field (createdAt, price, views)
- `sortOrder`: Sort order (asc, desc)

### Get Single Product
```http
GET /api/products/:id
```

### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Vintage Wooden Chair",
  "description": "Beautiful vintage wooden chair made from reclaimed oak",
  "price": 2500,
  "category": "furniture",
  "condition": "good",
  "location": "Delhi, India",
  "tags": "vintage,wooden,sustainable",
  "isNegotiable": true,
  "contactInfo": {
    "phone": "+91-9876543210",
    "email": "seller@example.com"
  },
  "images": [file1, file2, file3]
}
```

### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Updated Title",
  "price": 3000,
  "status": "sold"
}
```

### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Get My Products
```http
GET /api/products/my-products?page=1&limit=12&status=active
Authorization: Bearer <token>
```

### Get Products by Seller
```http
GET /api/products/seller/:sellerId?page=1&limit=12
```

### Get Featured Products
```http
GET /api/products/featured?limit=8
```

### Get Categories
```http
GET /api/products/categories
```

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "value": "eco-gadgets",
        "label": "Eco Gadgets",
        "count": 25
      },
      {
        "value": "reusable",
        "label": "Reusable",
        "count": 18
      }
    ]
  }
}
```

---

## 📊 Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProducts": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Express-validator for request validation
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **File Upload Security**: File type and size validation

---

## 📁 Project Structure

```
ecofinds-backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── userController.js     # User operations
│   └── productController.js  # Product operations
├── middleware/
│   └── authMiddleware.js     # Authentication middleware
├── models/
│   ├── User.js              # User schema
│   └── Product.js           # Product schema
├── routes/
│   ├── userRoutes.js        # User routes
│   └── productRoutes.js     # Product routes
├── uploads/                 # Image upload directory
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── server.js              # Main application file
└── README.md              # This file
```

---

## 🧪 Testing the API

### Using cURL

1. **Register a user:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

2. **Login:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. **Get products:**
```bash
curl -X GET http://localhost:5000/api/products
```

### Using Postman

Import the API collection or use the examples above to test the endpoints.

---

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecofinds
JWT_SECRET=your_production_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Steps

1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)
4. Set up file storage (AWS S3, Cloudinary, etc.) for production image hosting

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Support

For support, email support@ecofinds.com or create an issue in the repository.

---

## 🔄 API Versioning

Current API version: v1.0.0

All endpoints are prefixed with `/api/` for version 1.

---

## 📈 Performance

- Database indexing for optimal query performance
- Pagination for large datasets
- Image optimization and compression
- Rate limiting to prevent abuse
- Efficient search with MongoDB text indexes

---

## 🔮 Future Enhancements

- [ ] Email notifications
- [ ] Real-time chat between buyers and sellers
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Mobile app support
- [ ] Admin dashboard
- [ ] Product recommendations
- [ ] Wishlist functionality
