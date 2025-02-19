const jwt = require("jsonwebtoken")

const isAdmin = async(req,res,next)=>{
       
            const authHeader = req.header("Authorization");

            

            if(!authHeader){
                return res.status(401).json({message: "Access denied. No token provided."})
            }
            
            
            
            const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    
           jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken)=>{
                       if(error){
                           return res.status(400).json({message: "Invalid Token"})
                       } else{
                           if(!validToken.isAdmin){
                            console.log(validToken);
                               return res.status(403).json({message: "Not an admin"});
                           }
                           
                           
                           req.user = validToken;
                           next();
                       }
                   })
            
}
module.exports = {isAdmin}