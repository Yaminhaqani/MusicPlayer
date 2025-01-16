const jwt = require("jsonwebtoken")


const isAuthorised = async(req,res,next)=>{
    try {

        const authHeader = req.header("Authorization");
        
        
        if(!authHeader){
            return res.status(401).json({message: "Access denied. No token provided."})
        }
        

        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader; 

        const verifyToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
      
        req.user = verifyToken;

        next();
        
    } catch (error) {
        console.error("JWT verification error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
          }
        res.status(401).json({ message: "Invalid token." });
    }
}

module.exports = {isAuthorised}