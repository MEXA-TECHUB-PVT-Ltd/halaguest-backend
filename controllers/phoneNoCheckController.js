const hotelModel = require("../models/hotelModel");
const driverModel = require("../models/driverModel");
const dispacherModel = require("../models/dispacherModel");
const guestModel = require("../models/guestModel");
exports.logins = async (req, res) => {
    const table_name = req.body.table_name;
    if (table_name === 'hotel') {
        console.log('hotel')
        hotelModel.find({ phoneno: req.body.phoneno }, (error, result) => {
            if (error) {
                res.send(error)
            } else {
                if (result.length === 0) {
                    res.send({ data: result, message: 'Hotel Doesnot Exists' })
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
                    res.send({ data: result, message: 'Driver Doesnot Exists' })
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
                    res.send({ data: result, message: 'Dispacher Doesnot Exists' })
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
                    res.send({ data: result, message: 'Guest Doesnot Exists' })
                } else {
                    const idData = result[0]._id
                    // console.log(result[0]._id)
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
                    }).populate('hotel_type_id').populate('payment_detail_id')
                }
            }
        })
    } else {
        res.send( { message: 'Table Name doesnot exists'})
    }
}