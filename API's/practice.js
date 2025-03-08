const asyncErrorHandling=require('express-async-handler')
const exp = require('express')
const UserApp = exp.Router()
UserApp.use(exp.json())

UserApp.post('/practice', asyncErrorHandling(async(request,response) => {
    const practiceCollections=request.app.get("practice")
    const user=request.body
    console.log(user)
    await practiceCollections.insertOne(user)
    response.status(201).send("user created")
    
}))

module.exports = UserApp;