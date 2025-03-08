const exp=require("express")
const FoodApp=exp.Router()

const asyncErrorHandling=require("express-async-handler")

FoodApp.get('/get-food',asyncErrorHandling(async(request,response) => {
    const foodCollections1=request.app.get("foodList");
    const foodList=await foodCollections1.find().toArray();
    response.send({message:"foods are",payload:foodList});
}))

module.exports=FoodApp