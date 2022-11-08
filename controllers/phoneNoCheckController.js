const hotelModel = require("../models/hotelModel");
const mongoose = require("mongoose");
const driverModel = require("../models/driverModel");
const dispacherModel = require("../models/dispacherModel");
const guestModel = require("../models/guestModel");
const moment = require('moment');
exports.logins = async (req, res) => {
    const table_name = req.body.table_name;
    if (table_name === 'hotel') {
        console.log('hotel')
        hotelModel.find({ phoneno: req.body.phoneno }, (error, result) => {
            if (error) {
                res.send(error)
            } else {
                if (result.length === 0) {
                    const Createddate= new Date();
                    const diapacher = new hotelModel({
                        _id: mongoose.Types.ObjectId(),
                        phoneno: req.body.phoneno,
                        created_at: moment(Createddate).format("DD/MM/YYYY"),
                        status: "unblock",
                        device_token: req.body.device_token
                    });
                    try {
                        const savedHotel = diapacher.save();
                    res.json({ data: diapacher, message: 'Hotel Doesnot Exists' })

                    } catch (err) {
                        res.status(400).send(err);
                    }
                } else {
                    const idData = result[0]._id
                    // console.log(result[0]._id)
                    const updateData = {
                        device_token: req.body.device_token
                    }
                    const options = {
                        new: true
                    }
                    hotelModel.findByIdAndUpdate(idData, updateData, options, (error, result) => {
                        if (error) {
                            res.send(error)
                        } else {
                            res.send( {data: result, message: 'Hotel Exists'})
                        }
                    }).populate('hotel_type_id').populate('payment_detail_id')
                }
            }
        })
    } else if (table_name === 'driver') {
        console.log('driver')
        driverModel.find({ phoneno: req.body.phoneno }, (error, result) => {
            if (error) {
                res.send(error)
            } else {
                if (result.length === 0) {
                    // res.send({ data: result, message: 'Driver Doesnot Exists' })
                    const Createddate= new Date();
                    const driver = new driverModel({
                        _id: mongoose.Types.ObjectId(),
                        phoneno: req.body.phoneno,
                        created_at: moment(Createddate).format("DD/MM/YYYY"),
                        status: "block",
                        device_token: req.body.device_token
                    });
                    try {
                        const savedHotel = driver.save();
                    res.json({ data: driver, message: 'Driver Doesnot Exists' })

                    } catch (err) {
                        res.status(400).send(err);
                    }
                } else {
                    const idData = result[0]._id
                    // console.log(result[0]._id)
                    const updateData = {
                        device_token: req.body.device_token
                    }
                    const options = {
                        new: true
                    }
                    driverModel.findByIdAndUpdate(idData, updateData, options, (error, result) => {
                        if (error) {
                            res.send(error)
                        } else {
                            res.send( {data: result, message: 'driver Exists'})
                        }
                    }).populate('dispacher_id').populate('vehicle_detail_id').populate('doc_id')
                }
            }
        })
    } else if (table_name === 'dispacher') {
        console.log('dispacher')
        dispacherModel.find({ phoneno: req.body.phoneno }, (error, result) => {
            if (error) {
                res.send(error)
            } else {
                if (result.length === 0) {
                    const Createddate= new Date();
                    const Dispacher = new dispacherModel({
                        _id: mongoose.Types.ObjectId(),
                        phoneno: req.body.phoneno,
                        created_at: moment(Createddate).format("DD/MM/YYYY"),
                        status: "unblock",
                        device_token: req.body.device_token
                    });
                    try {
                        const savedHotel = Dispacher.save();
                    res.json({ data: Dispacher, message: 'Dispacher Doesnot Exists' })

                    } catch (err) {
                        res.status(400).send(err);
                    }
                    // res.send({ data: result, message: 'Dispacher Doesnot Exists' })
                } else {
                    const idData = result[0]._id
                    // console.log(result[0]._id)
                    const updateData = {
                        device_token: req.body.device_token
                    }
                    const options = {
                        new: true
                    }
                    dispacherModel.findByIdAndUpdate(idData, updateData, options, (error, result) => {
                        if (error) {
                            res.send(error)
                        } else {
                            res.send( {data: result, message: 'Dispacher Exists'})
                        }
                    }).populate('payment_detail_id')
                }
            }
        })
    } else if (table_name === 'guest') {
        console.log('guest')
        guestModel.find({ phoneno: req.body.phoneno }, (error, result) => {
            if (error) {
                res.send(error)
            } else {
                if (result.length === 0) {
                    // res.send({ data: result, message: 'Guest Doesnot Exists' })
                    const Createddate= new Date();
                    const Guest = new guestModel({
                        _id: mongoose.Types.ObjectId(),
                        phoneno: req.body.phoneno,
                        created_at: moment(Createddate).format("DD/MM/YYYY"),
                        status: "unblock",
                        device_token: req.body.device_token
                    });
                    try {
                        const savedHotel = Guest.save();
                    res.json({ data: Guest, message: 'Guest Doesnot Exists' })

                    } catch (err) {
                        res.status(400).send(err);
                    }
                } else {
                    const idData = result[0]._id
                    // console.log(result[0])
                    const updateData = {
                        device_token: req.body.device_token
                    }
                    const options = {
                        new: true
                    }
                    guestModel.findByIdAndUpdate(idData, updateData, options, (error, result) => {
                        if (error) {
                            res.send(error)
                        } else {
                            res.send( {data: result, message: 'Guest Exists'})
                        }
                    }).populate({ 
                        path: 'hotel_id',
                        populate: {
                          path: 'hotel_type_id',
                          model: 'hotel_type',
                        }
                     })
                     .populate({ 
                        path: 'hotel_id',
                        populate: {
                          path: 'payment_detail_id',
                          model: 'payment_details',
                        }
                     })
                }
            }
        })
    } else {
        res.send( { message: 'Table Name doesnot exists'})
    }
}
