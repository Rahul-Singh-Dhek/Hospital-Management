const mongoose=require('mongoose')

const hospitalSchema=new mongoose.Schema({ 
  "Hospital Name": {type:String, required:true}
})
  
  module.exports= mongoose.model("Hospitals",hospitalSchema)