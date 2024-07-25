const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')



const app = express()
app.use(cors({origin: true, credentials: true}));
app.use(express.json())



const PORT = process.env.PORT || 8000

//schema
const schemaData = mongoose.Schema({
    email : String,
    password : String,
    retypePassword : String,
    firstname : String,
    lastname : String,
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    country : String,
    terms : String,
    newsletter : String
},{
    timestamps : true
})

const userModel = mongoose.model("user", schemaData)



//read
//http://localhost:8080/
app.get("/",async(req,res) =>{
    const data = await userModel.find({})
    res.json({success : true , data : data})
})

//create data //save data in mongodb
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, message : "Data saved successfully", data : data})
})

//update data
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const { id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({ _id : id},rest)
    res.send({success : true, message : "Data updated successfully", data : data})
})

//delete data
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, message : "Data deleted successfully", data : data})
})

mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{
    console.log("connect to DB")
    app.listen(PORT,()=>console.log("Server is running"))

})
.catch((err)=>console.log(err))

