I have used Express framework with mongoDB as Database to build this project.

----------Postman Collection---------   

Postman Collection Link --> https://drive.google.com/file/d/19x3AyWU21HrneK4IakO-p__LxNaCin43/view?usp=share_link

---------Database Collection----------

My mongoDB collection string will be in the index.js file as well as ,I have also uploaded all collections as json 
in the database folder , you can export it through mongoDB compass.

---------:Liberies used:-----------------

1.express-fileupload

This package is used to handle multupart formdata as well as uploading files to node js and move 
that uploaded file to its target location.

2.jsonwebtoken

I have used this package to generate Jwt tokens for login of psychiatrists as well as for authentication
of psychiatrist.

3.mongoose

I have used this package to connect my nodejs application to mongoDB and perform various crud operations
on my collections.

4.path

I have used this package to define the location where I want to store profile images.

-------APIs---------

1-> Post API Registerning Psychiatrist(Endpoint-->"/register/psychiatrists")
    This API is for creating psychiatrist in our database by taking Name , Password , Hospital Id in the
    req body in the form of raw json.

2-> Post API Login Psychiatrist(Endpoint-->"/login/psychitarists")
    This API is for Logging the Psychiatrist and giving them back their jwt tokken , so that
    Psychiatrist can easily create their patients data. By this it is insured that each psychitarists is
    able to create only his patients in the database.

3-> Post API Create Patient(Endpoint-->"/createPatient")
    This API is for creating patient accoding to the token given the Auth Bearer Token and the fields(Name,Address
    Email,Phone number,Password,Patient Photo) given in the form-data.It will also store the patient photo in the 
    upload folder, and save the link of instance of that file in the filed Profile Photo in the document of mongoDB collection.
    This post API will give the response in which there will be the documnent that is saved in the mongoDB collection,
    as well as there will be a field name Profile Photo in which there will be a link , if you click on that link ,
    you will be able to see the profile picture.

4-> Get API Fetching all the psychiatrists details of Hospital(Endpoint-->"/getHospital")
    This API will take HOSPITAL ID request body and give a respones that will include Name of Hospial , Total Psychiatrist in that
    hospital ,Total patients in that hospital as well as Name ,Id and Patient Count of every psychiatrists .
    

Thankyou VeryMuch------------------------------------------------------------------------------
