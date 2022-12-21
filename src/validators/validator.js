function isValidUserName(userName){
    if(typeof userName!="string"){
        return false
    }
    if(!/^[a-zA-Z ]{2,30}$/.test(userName)){
        return false
    }
    return true
}

function isValidAddress(address){
    if(typeof address!="string"){
        return false
    }
    if(address.length<10){
        return false
    }
    return true
}

function isValidEmail(email){
    if(typeof email!="string"){
        return false
    }
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        return false
    }
    return true
}

function isValidPhone(phone){
    if(typeof phone!="string"){
        return false
    }
    if(!/^\+[1-9]{1}[0-9]{11}$/.test(phone)){
        return false
    }
    return true
}


function isValidPassword(password){
    if(typeof password!="string"){
        return false
    }
    if(!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,15}$/.test(password) ){
        return false
    }
    return true
}

module.exports={isValidUserName,isValidPassword,isValidAddress,isValidEmail,isValidPhone}