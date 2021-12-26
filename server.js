const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const apiRoutes = require('./routes/apiRoutes');
const app = express();
app.use(express.json());
app.use('/api/',apiRoutes);

const initializeServerAndDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        .then(()=>{
            app.listen(3000,()=>{
                console.log('Connected to DB and Server started');
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    catch(e){
        console.log(error);
    }
}

initializeServerAndDB();