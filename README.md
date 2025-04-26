# 🛒 E-Commerce REST API

## 📚 Project Description
This is a simple E-Commerce backend API built with Node.js, Express, and MongoDB.  
It handles Products, Categories, Users, Carts, and Orders management.

---

## 🚀 Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- Joi (Validation)
- bcrypt
- Multer (File Uploads)
- UUID (Unique filenames)
- nodemon
- nodemailer
  

---

## 📂 Project Structure
```bash
├── controllers/
├── models/
├── routes/
├── middlewares/
├── validations/
├── uploads/    # Uploaded files (images)
├── app.js
├── package.json
├── README.md


🛤️ API Endpoints
**Auth**
POST /api/auth/register — Register a new user
POST /api/auth/login — Login user

**Products**
POST /api/products/ — Add new product
GET /api/products/ — Get all products
GET /api/products/:id — Get a specific product
PUT /api/products/:id — Update product
DELETE /api/products/:id — Delete product

**Categories**
POST /api/categories/ — Add new category
GET /api/categories/ — Get all categories

**Cart**
POST /api/cart/ — Add product to cart
GET /api/cart/:userId — Get user cart
PUT /api/cart/:userId/update/:productId — Update quantity
DELETE /api/cart/:userId/remove/:productId — Remove a product from cart
DELETE /api/cart/:userId/clear — Clear entire cart

**Orders**
POST /api/orders/ — Create new order
GET /api/orders/:userId — Get user orders
