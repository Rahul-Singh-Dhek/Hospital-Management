const validator=require("../validators/validator.js")
const mongoose=require("mongoose")
const hospitalModel=require("../models/hospitalModel.js")
const psychiatristModel=require("../models/psychiatristModel.js")
const jwt=require("jsonwebtoken")
const fs=require("fs")

fs.mkdir("./upload",function(err) {
    if (err) {
      if(err.code=="EEXIST"){
        console.log("Upload folder already exists.")
      }
    } else {
      console.log("Upload folder is created successfully created.")
    }
  })


const createPsychiatrist=async (req,res)=>{
    try{
        if(req.body.Name==undefined){
            return res.status(400).send({status:false,message:"Please provide Name in the request body."})
        }
        if(req.body.Password==undefined){
            return res.status(400).send({status:false,message:"Please provide Password in the request body."})
        }
        if(req.body["Hospital Id"]==undefined){
            return res.status(400).send({status:false,message:"Please provide Hospital ID in which you work in the request body."})
        }
        if(req.body["Patients Count"]){
            return res.status(400).send({status:false,message:"No need to  provide Patient Count, this will be automatically updated when patient is added."})
        }
    
        if(!validator.isValidUserName(req.body.Name)){
            return res.status(400).send({status:false,message:"Please provide valid Name the request body."})
        }
        if(!validator.isValidPassword(req.body.Password)){
            return res.status(400).send({status:false,message:"Please provide valid Password that must contain one upper character, one lower character and a number of Max length 15 and min length 8 in the request body."})
        }
        if(!mongoose.Types.ObjectId.isValid(req.body["Hospital Id"])){
            return res.status(400).send({status:false,message:"Please provide valid Hospital Id in the requset body."})
        }
        let hospital=await hospitalModel.findById(req.body["Hospital Id"])
        if(!hospital){
            return res.status(404).send({status:false,message:"Provided Hospital Id does not exists in our database."})
        }
    
        let savedData= await psychiatristModel.create(req.body)
        return res.status(201).send({status:true,message:"Psychiatrist successfully created",data:savedData})
    }
    catch(err){
        return res.status(500).send({status:true,message:err.message})
    }
}

const loginPsychiatrist=async (req,res)=>{
    try{
        if(!req.body.Name){
            return res.status(400).send({status:false,message:"Please provide Name in the request body."})
        }
        if(!req.body.Password){
            return res.status(400).send({status:false,message:"Please provide Password in the request body."})
        }
    
        if(!validator.isValidUserName(req.body.Name)){
            return res.status(400).send({status:false,message:"Please provide valid Name the request body."})
        }
        if(!validator.isValidPassword(req.body.Password)){
            return res.status(400).send({status:false,message:"Please provide valid Password that must contain one upper character, one lower character and a number of Max length 15 and min length 8 in the request body."})
        }
    
        let psychiatrist=await psychiatristModel.findOne({Name:req.body.Name,Password:req.body.Password})
        if(!psychiatrist){
            return res.status(404).send({status:false,message:"No psychiatrist found with the Name and Password provided."})
        }
    
        let tokken=jwt.sign({Id:psychiatrist._id.toString(),Name:psychiatrist.Name},"LetticeRSD")
        return res.status(200).send({status:true,message:"successfully Login",token:tokken})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }

}
module.exports={createPsychiatrist,loginPsychiatrist}