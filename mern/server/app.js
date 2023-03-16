const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config({path:'./config.env'})
require('./db/conn');

const PORT = process.env.PORT;
app.use(express.json());
app.use(require('./router/auth'));
const User = require('./models/userSchema');
//MiddleWare
const middleware = (req, res, next) => {
    console.log("hi");
    next();
}

app.get("/", (req, res) => {
    res.send(`Hello World From Me`);
});

app.get("/about", middleware, (req, res) => {
    res.send(`Hello About World From Me`);
});

app.get("/contact", (req, res) => {
    res.send(`Hello Contact World From Me`);
});

app.get("/signin", (req, res) => {
    res.send(`Hello Login World From Me`);
});

app.get("/signup", (req, res) => {
    res.send(`Hello Registration World From Me`);
});

app.listen(PORT, () => {
    console.log(`success ${PORT}`);
})