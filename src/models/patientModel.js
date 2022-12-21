const mongoose=require('mongoose')

const patientSchema=new mongoose.Schema({ 
    Name: {type:String, required:true},
    Address:{type:String, required:true},
    Email:{type:String,required:true},
    "Phone Number":{type:String},
    Password:{type:String,require:true},
    "Patient Photo":{type:String,required:true},
    "Psychiatrist Id":{type:mongoose.Types.ObjectId,require:true,ref:"Psychiatrist"}
},{timestamps:true})
  
  module.exports= mongoose.model("patient",patientSchema) 