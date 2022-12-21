const validator = require("../validators/validator.js")
const patientModel = require("../models/patientModel.js")
const psychiatristModel = require("../models/psychiatristModel.js")
const path = require("path")

const createPatient = async (req, res) => {
    try {
    if (!req.body.Name) {
        return res.status(400).send({ status: false, message: "Please provide Name in the request body form data." })
    }
    if (!req.body.Address) {
        return res.status(400).send({ status: false, message: "Please provide Address in the request body form data." })
    }
    if (!req.body.Email) {
        return res.status(400).send({ status: false, message: "Please provide Email in the request body form data." })
    }
    if (!req.body.Password) {
        return res.status(400).send({ status: false, message: "Please provide Password in the request body form data." })
    }
// console.log(req.files)
    if(req.files==null){
        return res.status(400).send({ status: false, message: "Please provide Patient Photo with filed name Patient Photo in request body form data." })
    }
    if(req.files["Patient Photo"]==undefined){
        return res.status(400).send({ status: false, message: "Please provide Patient Photo only in filed name Patient Photo in request body form data." })
    }
    if (Array.isArray(req.files["Patient Photo"])) {
            return res.status(400).send({ status: false, message: "Please provide only one Patient Photo in filed name Patient Photo in request body form data." })
    }
    if(!req.files["Patient Photo"].mimetype.includes('image/')){
        return res.status(400).send({status:false,message:"Please provide only image formats in the Patient Photo field"})
    }

    if (!validator.isValidUserName(req.body.Name)) {
        return res.status(400).send({ status: false, message: "Please provide valid Name the request body form data." })
    }
    if (!validator.isValidAddress(req.body.Address)) {
        return res.status(400).send({ status: false, message: "Please provide valid Address in the request body form data that must be of atleast 10 charecters." })
    }
    if (!validator.isValidEmail(req.body.Email)) {
        return res.status(400).send({ status: false, message: "Please provide valid Email in the request body form data." })
    }
    let unique = await patientModel.findOne({ Email: req.body.Email, "Psychiatrist Id": req.decodedtoken.Id })
    if (unique) {
        return res.status(400).send({ status: false, message: "Please provide unique email" })
    }
    if (req.body["Phone number"] != undefined) {
        if (!validator.isValidPhone(req.body["Phone number"])) {
            return res.status(400).send({ status: false, message: "Please provide valid 10 degit Phone number with county Code in the request body form data." })
        }
    }
    if (!validator.isValidPassword(req.body.Password)) {
        return res.status(400).send({ status: false, message: "Please provide valid Password that must contain one upper character, one lower character and a number of Max length 15 and min length 8 in the request body form data." })
    }

    req.body["Psychiatrist Id"] = req.decodedtoken.Id
    let psychiatrist = await psychiatristModel.findByIdAndUpdate(req.body["Psychiatrist Id"], { $inc: { "Patients Count": +1 } }, { new: true })
    if (!psychiatrist) {
        return res.status(404).send({ status: false, message: "Psychiatrist in the token does not exist in the database" })
    }

    let fileName=Date.now()+'-'+req.files["Patient Photo"].name;
    fileName=fileName.split(" ").join("")

    let newPath=path.join(process.cwd(),'upload',fileName)
    req.files["Patient Photo"].mv(newPath)
    let link=`http://localhost:3000/profile/${fileName}`
    req.body["Patient Photo"]=link

        let savedData=await patientModel.create(req.body)
        return res.status(201).send({status:true,message:"Patient successfully created",data:savedData})
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = { createPatient }