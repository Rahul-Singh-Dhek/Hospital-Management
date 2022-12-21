const mongoose=require('mongoose')

const psychiatristSchema=new mongoose.Schema({ 
    Name: {type:String, required:true},
    Password:{type:String,require:true},
    "Patients Count":{ type:Number, default:0 },
    "Hospital Id":{type:mongoose.Types.ObjectId,require:true,ref:"Hospital"}
},{timestamps:true})
  
  module.exports= mongoose.model("Psychiatrist",psychiatristSchema)
