const jwt = require('jsonwebtoken')

// JWT_SECRET for authentication
const JWT_SECRET = "matkarohackingy@@r"



const userDeatails = (req,res,next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({"error":"Hey, Please authenticate with valid user"})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
    } catch (error) {
        res.status(401).send({"error":"Please authenticate with valid user"})
    }
     

    next()
}

module.exports = userDeatails