const exp = require('express')
const ProductsApp = exp.Router()
const asyncErrorHandling = require('express-async-handler')


ProductsApp.get('/get-products', asyncErrorHandling(async (request, response) => {
    const productCollections = request.app.get("productsObj");
    let list = await productCollections.find().toArray();
    response.send({message:"products are:", payload:list})
}))


ProductsApp.post('/category/:cat',asyncErrorHandling(async(request,response) => {
    const productCollections = request.app.get("productsObj");
    console.log(request.params)
    let list = await productCollections.find({category:request.params.cat}).toArray();
    response.status(201).send({message:"fetched",data:list})
}))



module.exports = ProductsApp