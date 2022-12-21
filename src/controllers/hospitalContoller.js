const hospitalModel = require("../models/hospitalModel.js")
const psychiatristModel = require("../models/psychiatristModel.js")
const mongoose = require("mongoose")

const getHospital = async (req, res) => {
    if (req.body["HOSPITAL ID"] == undefined) {
        return res.status(400).send({ status: false, message: "Plase provide HOSPITAL ID in the request body" })
    }
    if (!mongoose.Types.ObjectId.isValid(req.body["HOSPITAL ID"])) {
        return res.status(400).send({ status: false, message: "Plase provide valid HOSPITAL ID in the request body" })
    }
    let hospital = await hospitalModel.findById(req.body["HOSPITAL ID"])
    if (hospital == null) {
        return res.status(404).send({ status: false, message: "No hospital found with this HOSPITAL ID" })
    }
    let output = {}
    output["Hospital name"] = hospital["Hospital Name"]
    let psychiatrists = await psychiatristModel.find({ "Hospital Id": req.body["HOSPITAL ID"] }, { Name: true, 'Patients Count': true }).lean()
    output["Total Psychiatrist count"] = psychiatrists.length
    let totalPatient = 0
    for (let ele of psychiatrists) {
        ele.Id=ele._id
        delete ele._id
        totalPatient = totalPatient + ele['Patients Count']
    }
    output["Total patients count"] = totalPatient
    output["Psychiatrist Details"] = psychiatrists
    return res.status(200).send({ status: true, data: output })
}



module.exports = { getHospital }