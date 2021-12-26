const mongoose = require('mongoose');
const schema = mongoose.Schema;

const factoryModel = new schema({
    currentSales:{
        type:Number,
        required:true
    },
    totalTargetSales:{
        type:Number,
        required:true
    },
    progressPercentage:{
        type:Number
    },
    factoryName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Factory"
    },
    childrens:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Factory"
    }]
})

module.exports = mongoose.model('Factory',factoryModel);