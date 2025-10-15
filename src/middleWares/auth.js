 const adminAuth=(req, res, next) => {
  console.log("Admin auth is getting checked");

  const token = "demo";
  const isAdminAuthorised = token === "demo";
  if (!isAdminAuthorised) {
   return  res.status(401).send("Authorised Request");
  } else {
    next();
  }
};

const userAuth=(req,res,next)=>{
      console.log("user auth is getting checked");

    const token ="xyz";
    const isUserAuthorised=token==="xyz";
    if(!isUserAuthorised){
        res.status(401).send("unAuthorised request")
    }else{
        next();
    }
};

module.exports={
    adminAuth,
    userAuth
};