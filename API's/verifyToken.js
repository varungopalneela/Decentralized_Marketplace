let jwt=require('jsonwebtoken')

let verifyToken=(request,response,next) => {
    const bearerToken=request.headers.authorization;
    if(bearerToken===undefined){
        response.send({message:"Unauthorized access, please login again.."})
    }
    else{
        const token=bearerToken.split(" ")[1]
        try{
            jwt.verify(token,'abcdefg')
            next()
        }
        catch(err){
            next(new Error("Session expired.."))
        }
    }
} 

module.exports=verifyToken;