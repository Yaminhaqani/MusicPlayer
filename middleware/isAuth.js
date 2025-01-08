const jwt = require("jsonwebtoken")


const isAuthorised = async(req,res,next)=>{
    try {

        const authHeader = req.header("Authorization");

        if(!authHeader){
            return res.status(401).json({message: "Access denied. No token provided."})
        }

        console.log(authHeader);
        

        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        const verifyToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = verifyToken;

        next();
        
    } catch (error) {
        console.error("JWT verification error:", error);
        res.status(400).json({ message: "Invalid token." });
    }
}

module.exports = {isAuthorised}