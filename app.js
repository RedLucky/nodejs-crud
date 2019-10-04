const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan')
// initialize our express app
const app = express();
const product = require('./routes/product.route'); // Imports routes for the products

// setup mogoose connection 
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});