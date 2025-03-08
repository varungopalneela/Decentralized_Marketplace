let exp=require("express")

const app=exp()

const cors=require('cors')

app.use(cors())

app.listen(3500,()=>console.log("server listening at 3500.."))

const middleware1=(request,response,next) => {
    console.log("middle ware-1 exceuted..")
    next();
}

const mClient=require("mongodb").MongoClient;

mClient
    .connect("mongodb://127.0.0.1:27017")
    .then((dbRef) => {
        const dbObj=dbRef.db("decentralized_marketplace")

        const userCollectionObj=dbObj.collection("usercollection");
        app.set('userCollectionObj',userCollectionObj)

        const productCollections=dbObj.collection("products");
        app.set('productsObj',productCollections)

        const foodCollections=dbObj.collection("foods");
        app.set('foodList',foodCollections);

        const cart=dbObj.collection("cart")
        app.set('cartList',cart)

        const practiceObj=dbObj.collection("practice")
        app.set('practice',practiceObj)

        console.log("database connection success")
    })
    .catch((err) => console.log("database connect error: ",err))

//import userApp
const userApp=require("./API's/usersApi")
app.use('/users-api',userApp)

const productsApp=require("./API's/productsApi")
app.use('/products-api',productsApp)

const foodApp=require("./API's/foodsApi")
app.use('/foods-api',foodApp)

const practice2=require("./API's/practice")
app.use('/practice-api',practice2)

const invalidPath=(request,response,next)=>{
    response.send({message:"Invalid path"})
}



app.use("*",invalidPath)

const errhandling=(error,request,response,next) => {
    response.send({message:error.message})
}

app.use(errhandling)