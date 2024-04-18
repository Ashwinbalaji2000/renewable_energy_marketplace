require("dotenv").config();

const express = require('express')
const expressLayout = require("express-ejs-layouts")

const connectDB = require('./server/config/db');
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080 || process.env.PORT;

//Connect DB
connectDB();

app.use(express.static('public'))
app.use(bodyParser.json())

//Templating Engin
 app.use(expressLayout)
app.set("layout","./layouts/main");
app.set("view engine", "ejs");

app.use('/', require('./server/routes/main'))
// app.use('/api/insertenergyrequest', require('./server/routes/api'))


// Import API routes
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);








app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})