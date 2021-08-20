const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const router = express.Router();

//----model
const User = require('./UserModel');
const Help = require('./HelpModel');
//------------JSON WEB TOKEN---------------------

const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer')




var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your@gmail.com', //your google email
    pass: 'yourpassward'      //your password
  }
});


//middleware
const verifyJWT = (req, res, next) => {

    const token = req.headers["x-access-token"]

    if(!token){
        res.status(403)
        res.json({ auth: false, message:"you dont have token"});
    }else{
        jwt.verify(token,"jwtSecret",(err,decoded) => {
            if(err){
                res.status(403)
                res.json({ auth: false, message:"failed to authenticate"});
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}


//Register
router.post('/register', async (req, res,) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const user1 = await User.findOne({ email: user.email });
        if (user1) {
            res.status(500)
            res.json({
                message: "Email already Registered",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        res.json({
            message:"success",
        });
        
    }catch (error) {
        res.send("error" + error)
   }
});

//logIn
router.post('/login', async(req, res) => {
    const user = ({
        email: req.body.email,
        password: req.body.password
    })                      
    try{     //find user with email id
        const user1 = await User.findOne({ email: user.email });
        if (!user1 ){
            res.status(404)
            res.json({
                auth:false,
                message: "User not found incorrect Email",
            });
            return;
        }
                  //password match
        bcrypt.compare(user.password,user1.password,(err,isMatch)=>{
            if(isMatch) {
                 res.status(200)
                  //jwt 
                const id = user1._id;
                const token = jwt.sign({id},"jwtSecret",{
                    expiresIn: "7d",
                })
                res.json({auth:true, token:token, 
                   // result:user1
                }); //jwt end

                return;
                }
            else{
                  res.status(500)
                  res.json({
                      auth:false,
                      message: "Incorrect password"
                    })
                }
            })
        
    }
    catch (err) {
        res.send("error" + err)
    }
})


//for profile
router.get('/userdata',verifyJWT, async (req, res) => {
   
    const user = await User.findOne({ _id: req.userId });
  
     if(user){
         try{
              res.json(user)
         }
         catch (err) {
          res.send("error" + err)
         }
     }else{
         res.send("no user")
     }
  });

router.get('/home',verifyJWT, async (req, res) => {
  try{
    const user = await User.findOne({ _id:req.userId }).exec();
    if (!res) {
      res.status(403);
      res.json({
        message: "invalid access",
      });
      return;
    }
    res.send(user)
  }
  catch (err) {
    res.send("error" + err);
  }
  });
//Verify Email
router.post('/verifyclick',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                res.status(422)
                res.json({error: "User not found with this email"})
                return;
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save()
            .then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"uditmehra70@gmail.com",
                    subject:"EMAIL VERIFY",
                    html:`
                    <p>You requested for verify email</p>
                    <h2>Click in this <a href="http://localhost:3000/verify/${token}">link</a> to Verify your email</h2>
                    `
                },function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent to: '+user.email + info.response);
                    }
                  })
            res.json({
                message:"check your email",
            })
            })

        })
    })
})
//Verify Email
router.post('/verify-email',(req,res)=>{
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
             res.status(422)
             res.json({error:"Try again session expired"})
            return;
        }else{
            user.resetToken = undefined
            user.expireToken = undefined
            user.verify = true
            user.save()
            res.json({message:"verified"})
        }
    })
    .catch(error=>{
        console.log(error)
    })
})

//////////Help Post
router.post('/help', verifyJWT , async (req, res,) => {

    const user = await User.findOne({ _id: req.userId });

    if(user){
        const currentDate = new Intl.DateTimeFormat("en-GB",{dateStyle:"long",}).format()
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        

        const help = new Help({
            
            title: req.body.title,
            description: req.body.description,
            userId:req.userId,
        
            time:currentTime,
            date:currentDate,})
                try {
                 help.save()
                res.status(200)
                res.json({
                    message:"success",
                });
                
                }catch (error) {
                    res.send("error" + error)
               }
    }
    else{
        res.send("Invalid user")
    }
});

//All Help Get
router.get('/help',verifyJWT, async (req, res,) => {
    try {
        await  Help.find({}, function (err, helps) {
            res.send(helps);
        });
    }catch (error) {
        res.json("error" + error)
   }
});



module.exports = router;