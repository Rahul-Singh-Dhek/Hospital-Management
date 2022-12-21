const express = require('express')
const router = express.Router()
const psychiatristController=require("../controllers/psychiatristController.js")
const patientContoller=require("../controllers/patientController.js")
const hospitalContoller=require("../controllers/hospitalContoller.js")
const {authentication}=require("../middlewares/middle.js")

router.post("/register/psychiatrists",psychiatristController.createPsychiatrist)
router.post("/login/psychitarists",psychiatristController.loginPsychiatrist)
router.post("/createPatient",authentication,patientContoller.createPatient)
router.get("/getHospital",hospitalContoller.getHospital)

router.all("/testme", (req, res) => 
{ console.log(req.params.productId)
    return res.status(400).send({ status: false, message: "Endpoint is not correct" }) })

module.exports = router;
