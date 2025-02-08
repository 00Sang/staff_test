const express = require('express');
const cors = require('cors');
const router = require('./router/staffroute')
require('dotenv').config();;

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);





app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
})