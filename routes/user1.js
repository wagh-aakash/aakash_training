var express=require('express');
var router =express.Router();

//--------------Middleware-----------------------
router.use((req,res,next)=>{
    console.log("Time:",new Date())
    next();
})

router.get('/user2',(req,res,next)=>{
    console.log('Request URL:', req.originalUrl)
    next();
},(req,res,next)=>{
    console.log('Request Type:', req.method)
    next();
},(req,res)=>{
    res.json({
        status:true,
        id:req.params.id
    })
})

module.exports=router;