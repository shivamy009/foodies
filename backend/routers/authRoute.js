const express = require('express');
const { signUp, signIn, veryfymail } = require('../controllers/userController');
const { requireSignin, isadmin, isVerifiedforsignin } = require('../middleware/authMiddleware');


const router= express.Router();

// for signup

router.post('/signup',signUp)

// for signin

router.get('/verify',veryfymail)

router.post('/signin',isVerifiedforsignin,signIn)

router.get('/user-auth',requireSignin,(req,res)=>{
    res.status(200).send(({ok:true}))
})

router.get('/admin-auth',requireSignin,isadmin,(req,res)=>{
    res.status(200).send(({ok:true}))
})


module.exports=router;