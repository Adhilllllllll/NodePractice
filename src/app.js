
// const express = require("express");

// const mongoose = require('mongoose');
// const User = require("./models/user");
 
// const app = express();

// app.use(express.json());

// //signup route

// app.post("/signup", async (req, res) => {
//   //creatin the new instance of the User model
//   try {
//     const {name,email,password} =req.body;

//     console.log("recieved body",req.body);

//     const user = await User.create({
//       name,
//       email,
//       password,
//     });
//     res.status(201).json(user);
//   } catch (err) {
//     console.log(err.stack);

//     res.status(400).send(err.message);
//   }
// });




// mongoose
//   .connect(
//     `mongodb+srv://adhilp387_db_user:4Zruh99DDN4NIxIS@devtinder.ucxfyce.mongodb.net/?retryWrites=true&w=majority&appName=devTinder`
//   ).then(() => console.log("connection sucessed"))
//   .catch((err) => console.log(err.message));

//  const db= mongoose.connection
//  db.on("error",(err)=>{
//     console.log(err.message);
    
//  })

//  db.on("connected",()=>{
//     console.log('connected');
    
//  })
//   app.listen(7777, ()=> {
//     console.log('App is running on the port 7777')
//   })

// //4Zruh99DDN4NIxIS === password 





const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
app.use(express.json());

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error(err.stack);
    res.status(400).send(err.message);
  }
});


app.get("/user",async (req,res)=>{
    const email=req.body.email;
  try{
   const users=await User.find({email});
   if(users.length===0){
    res.status(404).send("User not found")
   }else{
    res.send(users); 
   }

  }catch(err){
    console.error("email not found:",err.message)
    res.status(400).send("something went wrong")
  }
    
});

//feed API-GET/feed - get all the users from the database
app.get("/feed",async (req,res)=>{
  try{
    const users=await User.find({});
    res.send(users)
  }catch(err){
     res.status(400).send("something went wrong");
  } 
})


//delete  
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId);
      res.send("user deleted successfully ") 
  }catch(err){
    res.status(400).send("something went wrong")
  }
  });

//update or patch
app.patch("/user",async(req,res)=>{
  const userId =req.body.userId;
  const data=req.body;

  try{
    const user=await User.findByIdAndUpdate({_id:userId},data,{
      returnDocument:"after",
    });
    console.log(user);
    res.send("user updated successfully");
  }catch(err){
    res.status(400).send("something went wrong")
  }
})


// Connect to MongoDB and start the server
mongoose
  .connect(
    "mongodb+srv://adhilp387_db_user:4Zruh99DDN4NIxIS@devtinder.ucxfyce.mongodb.net/?retryWrites=true&w=majority&appName=devTinder"
  )
  .then(() => {
    console.log("MongoDB connection successful!");
    app.listen(7777, () => {
      console.log("App is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });




  //"68ee47fda95920afdb58700a"