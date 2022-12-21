const express=require("express")
const route=require("./routes/route.js")
const mongoose=require("mongoose")
const app=express()
const fileUpload=require('express-fileupload')

app.use(express.json());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./tempImages"
}))

app.use('/profile',express.static('upload'))

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://RahulSinghDhek:IQpy326QQQKAkK2J@cluster0.dxzlfnc.mongodb.net/latticeDB?retryWrites=true&w=majority",)
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);
 

app.listen(3000,()=> console.log('Express app running on port ' + ( 3000)))


