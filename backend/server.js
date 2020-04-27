
let express=require("express");

//let router=require("express").Router();
let app=express();
let router = require('./router/router')
let mongoose=require("mongoose");
let bodyparser=require("body-parser");
let cors = require('cors')

app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/nodeapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true});


app.get('/', (req, res) => {
    res.send('chala');
})
app.use(express.static('public'))
    
app.use('/',router);
app.listen(8969 ,()=>{
    console.log("server started");
})






