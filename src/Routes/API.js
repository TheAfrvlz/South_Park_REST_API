const {Router} =require('express');
const FileName = "Characters.json";
const router = Router();

var path = require('path');

router.get('/Characters',(req,res) =>{
    res.header("Content-Type",'application/json');
    res.sendFile(path.resolve(FileName));
})

router.get('/Characters/Group',(req,res)=>{
    res.sendFile(path.resolve(FileName));
})

router.get('/Characters/Name',(req,res) =>{
    const {Age} = req.params;
    res.send(`Specific age ${Age}`);
})

router.get('/Characters/',(req,res) =>{
    const {Age} = req.params;
    res.send(`Specific age ${Age}`);
})


module.exports= router;