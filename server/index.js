const express=require('express');
const mongoose = require('mongoose');
const userRoutes = require('./users.js');
const bodyParser = require('body-parser')

const app = express();
var cors = require('cors');   //FOR diffrent port run on same web like connect to React app
app.use(cors());


//Database Connection
const url = "mongodb://localhost/my_db";
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: false})
const db = mongoose.connection
db.on('open',()=>console.log('db connected'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


//Setting up routes
app.use('/users',userRoutes)


//Listening on PORT
PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is listening on: http://localhost:${PORT}`)
})
