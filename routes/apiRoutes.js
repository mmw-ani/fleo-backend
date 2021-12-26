const express = require('express');
const Factory = require('../models/factoryModels');
const router = express.Router();
const {setStatus,setPercentage} = require('../common/common');

router.post('/category',async(request,response)=>{
    const {factoryName,totalTargetSales,currentSales,parentId} = request.body;
    const progressPercentage = setPercentage(totalTargetSales,currentSales);
    const status = setStatus(progressPercentage);
    const payload = {
        factoryName,
        totalTargetSales,
        currentSales,
        progressPercentage,
        status,
        parentId:parentId?parentId:undefined
    }
    try{
        const created = await Factory.create(payload);
        if(parentId){
            const res = await Factory.findOne({_id:parentId});
            res.childrens.push(created._id.toString()); 
            await res.save();
        }
        response.json({message:'Created'});
    }
    catch(e){
        response.status(500).json({message:e});
    }
})


router.put('/category/:categoryId',async(request,response)=>{
    const categoryId = request.params.categoryId;
    const {totalTargetSales,currentSales} = request.body;
    const progressPercentage = setPercentage(totalTargetSales,currentSales);
    const status = setStatus(progressPercentage);
    const payload = {
        totalTargetSales,
        currentSales,
        progressPercentage,
        status
    }
    try{
        let res = await Factory.findOne({_id:categoryId}) 
        res.totalTargetSales = totalTargetSales;
        res.currentSales = currentSales;
        res.progressPercentage = progressPercentage;
        res.status = status;
        await res.save();
        response.json({message:'Created'});
    }
    catch(e){
        response.status(500).json({message:e});
    }
})

router.get('/category',async (request,response)=>{
    try{
        const responseFromDB = await Factory.find({parentId:undefined});
        return response.json({data:responseFromDB});
    }
    catch(e){
        return response.status(500).json({message:e});
    }
})

router.get('/category/:categoryId',async (request,response)=>{
    const categoryId = request.params.categoryId;
    try{
        Factory
        .findOne({_id:categoryId})
        .then(responseFromDB=>{
            response.send(responseFromDB);
        });
    }
    catch(e){
        return response.status(500).json({message:e});
    }
})
router.delete('/category/:categoryId',async(request,response)=>{
    const categoryId = request.params.categoryId
    
    const result = await Factory.find({_id:categoryId});
    const childrens = result.childrens;
    for(let i=0;i<childrens.length;i++){
        await Factory.findOneAndUpdate({_id:childrens[i]},{parentId:undefined});
    }

    return response.send('Deleted');
})



module.exports = router;