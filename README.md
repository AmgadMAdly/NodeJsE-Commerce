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
POST /api/User/register           —> Register a new user
POST /api/User/login              —> Login user
POST /api/User/forgot-password    —> Forget Password
POST /api/User/change-password    —> Change Password
GET  /api/User/getAllUsers        —> Get All Users

**Products**
POST api/Product/createproduct        —> Add new product
GET /api/product/getproducts          —> Get all products
GET /api/product/getproduct/:id       —> Get a specific product
PUT /api/Product/updateproduct/:id    —> Update product
DELETE /api/Product/deleteproduct/:id —> Delete product

**Categories**
POST /api/category/createCategory       —> Add new Category
GET /api/category/getCategorys          —> Get all Categories
GET /api/category/getCategory/:id       —> Get a specific Category
PUT /api/category/updateCategory/:id    —> Update Category
DELETE /api/category/deleteCategory/:id —> Delete Category

**Cart**
POST /api/cart/AddCart             —> Add To Cart
GET /api/cart/getCart              —> Get Cart
DELETE /api/cart/removeCartItem    —> Remove Item from Cart
PUT api/cart/UpdateCart            —> Update Cart
DELETE /api/cart/clearCart         —> Delete Cart

**Orders**
POST /api/order/createOrder               —> Create new order
GET /api/order/getOrders                  —> Get All Orders [FOR ADMIN]
GET /api/order/getOrdersgetOrderById/     —> Get User Order using order id [FOR ADMIN]
GET /api/order/getUserOrder               —> Get User Orders [FOR CUSTOMER]
PUT /api/order/updateOrder/               —> Update Order
DELETE /api/order/deleteOrder/            —> Delete Order
