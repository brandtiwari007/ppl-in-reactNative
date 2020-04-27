router.post("/likes",upload.none(),(req,res)=>{

    console.log("likes coming",req.body._userid)
    console.log("++==+=",req.body)
    console.log("l",req.body._id)
   
   schema2.findOneAndUpdate({_id:req.body._id},{$addToSet:{"likes":req.body._userid}},{new:true},(err,result)=>{
       if(err){
           console.log(err)
       }else{
           console.log("like inserted",result)
           res.send(result)
       }
   })
} )
 router.get("/getLikes",(req,res)=>{

    schema2.find({_id:req.body._id},(err,result))
     if(err){
         console.log(err)
     }else{
         res.send(result)
     
     }
        
 })
