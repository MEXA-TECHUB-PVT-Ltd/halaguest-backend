const dispacherModel= require("../models/dispacherModel");
const mongoose = require("mongoose");
const moment = require('moment');
exports.getAllDispachers= (req,res)=>{
    dispacherModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({$natural:-1}).populate("payment_detail_id")
}

exports.getSpecificDispacher= (req,res)=>{
    const dispacherId = req.params.dispacherId;
    dispacherModel.find({_id:dispacherId},function(err, foundResult){
        try{
            res.json(foundResult)
        }catch(err){
            res.json(err)
        }
    }).populate("payment_detail_id")
}
exports.deleteDispacher= (req,res)=>{
    const dispacherId = req.params.dispacherId;
    dispacherModel.deleteOne({_id:dispacherId},function(err, foundResult){
        try{
            res.json(foundResult)
        }catch(err){
            res.json(err)
        }
    })
}
exports.createDispacher= async(req,res)=>{
    const Createddate= req.body.created_at;
    const diapacher = new dispacherModel({
        _id: mongoose.Types.ObjectId(),
        payment_detail_id: req.body.payment_detail_id,
        name_of_company: req.body.name_of_company,
        email: req.body.email,
        img: req.body.img,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        street_address: req.body.street_address,
        phoneno: req.body.phoneno,
        created_at: moment(Createddate).format("DD/MM/YYYY"),
        status: req.body.status,
        device_token: req.body.device_token
    });
    try {
        const savedDispacher = await diapacher.save();
        res.json({
            data:savedDispacher,
            message:"Dispacher Created successfully"
        })
    } catch (err) {
        res.status(400).send(err);
    }
}
exports.updateDispacher = async (req, res) => {
    const updateData = {
        name_of_company: req.body.name_of_company,
        payment_detail_id: req.body.payment_detail_id,
        email: req.body.email,
        img: req.body.img,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        street_address: req.body.street_address,
        phoneno: req.body.phoneno,
        status: req.body.status,
        device_token: req.body.device_token
    }
    const options = {
        new: true
    }
    dispacherModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({
                data:result,
                message:"Dispacher Updated Successfully"
            })
        }
    })
   
}



