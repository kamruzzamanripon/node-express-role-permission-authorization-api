const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const router = require('./src/routes/api');
const cors = require('cors');

const app = new express();

app.use(cors({
    origin: '*'
}));

//use app
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));


//mongoDB connection
const URI  = "mongodb://localhost:27017/Role_Permission_Authorization";
mongoose.connect(URI,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

//route defined
app.use('/api/v1', router);

//Undefined Route Implement
app.use('*', (req, res)=>{
    res.status(404).json({status:"fail", data:"Not Found"})
});


module.exports = app;
