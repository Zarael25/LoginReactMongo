const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User=require("../schema/user");

router.post("/",async (req,res) =>{
    const{username,name,password}=req.body;
    if(!username || !name || !password){
        return res.status(400).json(
            jsonResponse(400,{
                error: "Fields are required",
            }));
    }



    //CREAR USUARIO

   //const user =new User({username, name,password});
   try{
        const user = new User();
        const exists = await user.usernameExist(username);
    
        if (exists) {
        return res.status(400).json(
        jsonResponse(400, {
            error: "username already exists",
        })
        );
        //return next(new Error("user already exists"));
        } 
        const newUser = new User({ username, password, name });
    
    
    
        newUser.save()
    
        res.status(200).json(jsonResponse(200,{message: "User created successfully"})  );
        //res.send("signout");
   }
   catch(error){
    return res.status(400).json(
        jsonResponse(400, {
          error: "user already exists",
        })
    );
   }
 
});
module.exports = router;

