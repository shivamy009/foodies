
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { sendverifymail } = require('../utils/mailSender');

exports.signUp = async(req,res)=>{
    try{
        const{firstName,lastName,email,password,address}=req.body;
    
        if(!firstName || !lastName || !email || !password  || !address){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
         
        
        const existinguser = await User.findOne({email})
        
        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"This user already exist"
            })
            
        }
        
        // try and catch in hashpassword
        
        const hashedpassword= await bcrypt.hash(password,10);
        
        const user = await new User({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedpassword,
            address:address
        }).save();

        sendverifymail(firstName,email,user._id)

        return res.status(200).json({
            success:true,
            message:"User registered success",
            user
        })



    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Error in registration of user"
        })
    }
}


exports.veryfymail= async(req,res)=>{
    try{


      const updateinfo = await User.updateOne({_id:req.query.id},{$set:{isverified:1}})

      res.send('<h1> Your email has been verified </h1>')
      console.log("Your emial information",updateinfo)

    }
    catch(err){
        console.log(err.message)
    }
}


exports.signIn=async(req,res)=>{
    try{
        const{email,password}= req.body;
    
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        let user= await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"This user is not registered"
            })

        }

        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({
                success:false,
                message:"Password Incorrect"
            })

        }

        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        // const token = await jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:'7d'})

        console.log(user)
        
        user = user.toObject();
        
        user.password=undefined;
        console.log(user)

        return res.status(200).json({
            success:true,
            message:"User login success",
            user,
            token
        })



    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Error while login"
        })
    }
}
