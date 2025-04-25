const DB = require('./config/DB.js');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
DB.connectDB();
const UserRoutes = require('./Routes/User.Routes.js');
const ProductRoutes = require('./Routes/Product.routes.js');
const categoryRoutes = require('./routes/Category.routes.js');
const orderroutes = require('./routes/Order.Route.js');
const authMiddleware = require('./middleware/Auth.Middleware.js');
const authorizeRoles = require('./middleware/RoleAuth.Middleware.js');
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());


app.get('/home', (req, res) => {


})
app.use('/api/User', UserRoutes);
app.use('/api/Product', authMiddleware,ProductRoutes  );
app.use('/api/category', authMiddleware,categoryRoutes  );
app.use('/api/Order', authMiddleware,orderroutes  );
// app.use((err, req, res, next) => {

//     const error = new APIError("Iternal Server Error", 500);
//     res.status(error.status).json(error.message);
// })



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});