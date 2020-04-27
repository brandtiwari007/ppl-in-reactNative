let router=require('./router/router');
let schema=require("./schema/schema");
 module.exports={

        userFind:function(data){
            console.log("userFind",data)
            return new Promise( (resolve,reject)=>{
                schema.find( {email:data.email},(err,result)=>{
                 if (err){
                     reject(err)
                 } else{
                     resolve(result);
                 }   
                })
            })
            

        },

        createNew :function(data){
            return new Promise( (resolve,reject)=>{
                console.log("in api",data)
                schema.create(data,(err,result)=>{
                if(err){
                    console.log("in api if",err)
                    reject(err)
                }else{
                    console.log("in api else",result)

                    resolve(result)
                }

            })
        })

                
        },
        checkLogin: function(data){
          //  console.log(data,"check login data")
            return new Promise( (resolve,reject)=>{
                
                    schema.findOne( {$and:[  {email:data.email},{password:data.password}]},(err,result)=>{
                        if(err){
                            reject(err)    
                        }
                        if(result){
                            console.log("this is result",result)
                            resolve(result)
                        }else{
                           // resolve("user not exit")
                           console.log("++",result)
                          // reject("user not exit",result)
                           reject("either email not exist or password not mathched")
                           
                        }


                    })
                



            })
        }


 }