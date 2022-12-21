const jwt=require("jsonwebtoken")

const authentication=async (req,res,next)=>{
    try{
    if(!req.headers.authorization){
        return res.status(401).send({ status: false, msg: "token is required" });
    }
    console.log(req.headers.authorization)
    req.headers.authorization=req.headers.authorization.split(' ')[1]
    jwt.verify(req.headers.authorization, "LetticeRSD", (error, decodedtoken) => {
        if (error) {
            const msg = error.message === "jwt expired"? "Token is expired": "Token is invalid";
            console.log("authentication Failed")
            return res.status(401).send({ status: false, message:msg });
        }
        else {
            req.decodedtoken = decodedtoken;
            console.log("authentication Passed",decodedtoken)
            next();
        }
    });
    }
    catch(error){
        return res.status(500).send({ status: false, err: error.message });
    }
}

module.exports = { authentication }