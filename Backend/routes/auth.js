const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'harryisagoodb$oy'

// Create a new user
router.post('/createuser',[
  body('name','Enter a valid name').isLength({ min: 5 }),
  body('email','Enter a valid email Id').isEmail(),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
], async(req,res) =>{
   
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password,salt);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass,
  });
  try{
  const data = {
    user:{
      id:User.id
    }
  }
  const authtoken = jwt.sign(data,JWT_SECRET);
  res.json({authtoken})
}catch (error) {
    console.error(error.message);
    res.status(500).send('some error has occurd')
    
   }



})

// Authentiate a user using : post "/api/auth/login".No login required
router.post('/login',[

  body('email','Enter a valid email Id').isEmail(),
  body('password','password cannot be blank').exists(),
], async (req,res)=>{

  //if there are errrors , return Bad request and the errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});

  }

   const {email,password}= req.body;
   try {
    let user = await user.findOne({email});
    if(!user){
      return res.status(400).json({error:'Please try to login with correct credentials'});

    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error:'please try to login using correct credentials'});
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    res.json({authtoken})



    
   } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error')
    
   }

}
)

// Route3: Get loggedin user Details using: post "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req,res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(user.Id).select("-password")
    res.send(user)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

  


})

module.exports = router