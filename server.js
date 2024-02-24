const express = require('express');
const cors = require('cors');

// load .env file
require('dotenv').config();

// get config file
const config = require('./config');

const app = express();

// setup express plugin/middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup index route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to This Simple Test Service for my SMS Interview 😅"
    })
})

// load all routes
require('./routes')(app);

// start server
app.listen(config.APP.PORT, () => console.log(`Server is Running on Port ${config.APP.PORT} 🚀`))