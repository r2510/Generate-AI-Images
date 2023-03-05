const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;//initialized PORT

const app = express();

//Enable body parser in postman request
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//End of body parser
//public static folder for UI
app.use(express.static(path.join(__dirname,'public')));//made this folder public for UI
//End of folder


app.use('/openai', require('./routes/openaiRoutes'))//routing to routes folder to setup post request

app.listen(port, () => {console.log(`server created using express and started`)})//starting server
