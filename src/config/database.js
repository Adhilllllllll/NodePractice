// const { connect } = require("http2");
const mongoose = require("mongoose");

const connectDB = async () => {
    try{
  await  mongoose.connect(
  " mongodb+srv://adhilp387_db_user:4Zruh99DDN4NIxIS@devtinder.ucxfyce.mongodb.net/devTinderr?retryWrites=true&w=majority&appName=devTinder" // this gonna written promise
  );
  console.log("MongoDB connection established suuccessfully");
}catch(err){
     console.error("mongoDB connection failed:",err.message);
     throw err;//rethrow  so app.js can catch it 
}
};

module.exports=connectDB;

  

//ZsyWmTVMerccfNJf - password
//adhilp387_db_user -username
//mongodb+srv://adhilp387_db_user:ZsyWmTVMerccfNJf@crudcluster.rnqdkpz.mongodb.net/
