const validateSignUpData=(req)=>{
    const {name,email,pasword}=req.body;
    if(!name){
        throw new Error("name is valid")
    }
    else if(name.length <4){
        throw new Error("name required minimum 4 character ")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("please enter s strong password");
    }
};


module.exports={
    validateSignUpData,
}