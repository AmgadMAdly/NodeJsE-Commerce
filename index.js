const DB = require('./config/DB.js');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
DB.connectDB();
const UserRoutes = require('./Routes/UserRoutes.js');
const ProductRoutes = require('./Routes/Product.routes.js');
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());


app.get('/home', (req, res) => {


})
app.use('/api/User', UserRoutes);
app.use('/api/Product',ProductRoutes)




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});