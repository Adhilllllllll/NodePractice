
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
const {validateSignUpData}=require("./utilis/validation")
const bcrypt =require("bcrypt");

const app = express();
app.use(express.json());


app.post("/login",async(req,res)=>{
  try{
    const{email,password} =req.body;

    const user = await User.findOne({email});
    if(!user){
      throw new Error(" Invalid credentials");
    }
    const isPasswordValid=bcrypt.compare(password,user.password);
    if(isPasswordValid){
      res.send("login Successfully!")
    }else{
      throw new Error(" Invalid credentials");
    }

  }catch(err){
    res.status(400).send("ERROR:"+err.message);
  }
}); 

// Signup route

// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     console.log("Received body:", req.body);

//     if (!name || !email || !password) {
//       return res.status(400).send("All fields are required");
//     }

//     const user = await User.create({ name, email, password });
//     res.status(201).json(user);
//   } catch (err) {
//     console.error(err.stack);
//     res.status(400).send(err.message);
//   }
// });


app.post("/signup",async(req,res)=>{
  try{
    //validation of data
    validateSignUpData(req);

    const {password} =req.body;

    //ecrypt the password
  const passwordHash=await bcrypt.hash(password,10);
  console.log(passwordHash);

  //Creating a new instance of the user model
  const user=new User({
    name, 
    email,
    password :passwordHash,
  });

  await user.save();
  res.send("user added successfully"); 
  }catch(err){
     res.status(400).send("ERROR:" + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["name","gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed for some fields");
    }

    if (data?.skills && data.skills.length > 10) {
      throw new Error("Too many skills, update not allowed");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser: user,
    });
  } catch (err) {
    res.status(400).json({ error: `Update failed: ${err.message}` });
  }
});


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