const DB = require('./config/DB.js');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
DB.connectDB();
const UserRoutes = require('./Routes/UserRoutes.js');
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());


app.get('/home', (req, res) => {


})
app.use('/api/product', ProductRoutes);





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});