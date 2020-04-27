let mongoose=require("mongoose");
let schema=mongoose.Schema({
    username:"String",
    email:"String",
    password:"String",
    firstname:"String",
    lastname:"String"
})
module.exports=mongoose.model("nodeapi",schema)