var mongoose=require("mongoose")
 var uploadschema=mongoose.Schema({
     image:"String",
     title:"String",
     category:"String",
     date:'String',
     time:'String',
     likes:Array,
        
     
     username:"string",
     comment:[
         {
             comment:"String",
             username:"string"
         }
     ]
     
 })
 module.exports=mongoose.model("uploadpost",uploadschema);