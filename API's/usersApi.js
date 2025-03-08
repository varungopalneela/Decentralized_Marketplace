const exp = require('express')

const verifyToken=require('./verifyToken')

const UserApp = exp.Router()

const asyncErrorHandling=require('express-async-handler')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

UserApp.use(exp.json())


UserApp.get('/get-users',asyncErrorHandling(async (request, response) => {
    const usercollections = request.app.get("userCollectionObj")
    let List=await usercollections.find().toArray()
    response.status(201).send({ message: "users are: ", payload: List })

}))

UserApp.get('/get-user/:username',verifyToken, asyncErrorHandling(async(request, response) => {
    const userObj = request.app.get("userCollectionObj");
    let userName = (request.params.username);
    const dbRes= await userObj.findOne({ username: userName })
    delete dbRes.password
    response.send({ message: "user found", payload: dbRes })
        
}))



UserApp.post('/signup',asyncErrorHandling (async (request, response) => {
    const userObj = request.app.get("userCollectionObj")

    const newUser = request.body;
 
    let dbRes=await userObj.findOne({username:newUser.username})
    let dbRes1=await userObj.findOne({email:newUser.email})
    if(dbRes!=null || dbRes1!=null){
        if(dbRes!=null){
            response.status(202).send({message:"username already existed"})
        }
        else{
            response.status(202).send({message:"gmail already existed"})
        }
    }
    else{
        let pass1=await bcrypt.hash(newUser.password,4);
        newUser.password=pass1;
        await userObj.insertOne(newUser)
        response.status(201).send({ message: "User created" })
    }


}))


UserApp.put('/update-user', (request, response) => {
    const userCollectionObj = request.app.get("userCollectionObj");
    let userObj = request.body;
    userCollectionObj.updateOne({ id: userObj.id }, { $set: { ...userObj } })
        .then((dbRes) => {
            response.send({ message: "user replaced" })
        })
        .catch((err) => {
            console.error("err in user creation is: ", err)
            response.send({ message: "error", errMsg: err.message })
        })

})

UserApp.delete('/delete-user/:id', (request, response) => {
    const userCollectionObj = request.app.get("userCollectionObj");
    let userId=(+request.params.id);+9
    userCollectionObj.deleteOne({id:userId})
    .then(dbRes => {
        response.send({ message: `${userId} user id deleted`})
    })
    .catch((err) => {
        console.error("err in user creation is: ", err)
        response.send({ message: "error", errMsg: err.message })
    })
})


UserApp.post('/signin',asyncErrorHandling(async(request,response) => {
    const userCollectionObj=request.app.get("userCollectionObj")
    let userObj=request.body;
    
    const existUser=await userCollectionObj.findOne({username:userObj.username})
    if(existUser===null){
        response.send({message:"invalid username"})
    }
    else{
        let isEqual=await bcrypt.compare(userObj.password,existUser.password);
        if(isEqual===false){
            response.send({message:"invalid password"})
        }
        else{
            let jwtToken=jwt.sign({username:userObj.username},'abcdefg',{expiresIn:240})
            delete existUser.password;
            response.status(201).send({message:"success",token:jwtToken,user:existUser})
        }
    }
}))


UserApp.get('/test',verifyToken,asyncErrorHandling(async(request,response) => {
    response.send({message:"response from private route.."})
}))

UserApp.post('/userDetails',asyncErrorHandling(async(request,response) => {
    const userCollection=request.app.get("userCollectionObj")
    let userIs=request.body;
    const details=await userCollection.findOne({username:userIs.storedUsername})
    delete details.password
    response.send({message:"user is: ",userDetails:details})
}))


UserApp.post('/cartList',asyncErrorHandling(async(request,response) => {
    const currentUser=request.body;
    const userCollection=request.app.get("userCollectionObj")
    const productCollections = request.app.get("productsObj");
  
    let Userdetails=await userCollection.findOne({username:(currentUser.product.name)})
    let product=await productCollections.findOne({id:(+currentUser.product.id)})
    delete product.image
    delete product._id
    product.quantity=currentUser.product.quantity

    if(Userdetails.cart===undefined){
        Userdetails.cart=[]
    }
    await userCollection.updateOne({username:(currentUser.product.name)},{$push: {cart :product}})
    let list=await userCollection.findOne({username:currentUser.product.name})
    response.status(201).send({message:"added",data:list.cart})
}))

UserApp.post('/showCart',asyncErrorHandling(async(request,response) => {
    const userCollection=request.app.get("userCollectionObj")
    const userDetails=await userCollection.findOne({username:request.body.username})
    response.status(201).send({message:"cart retrieved",data:userDetails.cart})
}))

UserApp.post('/removeItem',asyncErrorHandling(async(request,response) => {
    let product=request.body.product
    const userCollection=request.app.get("userCollectionObj")
    // await userCollection.updateOne({username:product.name},{"cnoart":{id:product.id}, $dec:{quantity:-1}})

    await userCollection.updateOne({username:product.name},{$pull:{"cart":{id:(product.id)}}})
    // const userDetails=await userCollection.findOne({username:product.name})
    response.status(201).send({message:"updated",data:userDetails.cart})
}))

UserApp.post('/checkout',asyncErrorHandling(async(request,response) => {
    let user=request.body
    const userCollection=request.app.get("userCollectionObj")
    const userDetails=await userCollection.findOne({username:user.currentUser})
   
    response.status(201).send({message:"updated",data:userDetails.cart})
    
}))


module.exports = UserApp;