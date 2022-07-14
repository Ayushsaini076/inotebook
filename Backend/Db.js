const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&tls=false&directConnection=true"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;