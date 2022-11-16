const DriverModel = require("../models/driverModel");
const mongoose = require("mongoose");
const moment = require('moment');
const vehicleModel = require("../models/vehicleModel");
const orderModel = require("../models/orderModel");
const driver_search_radius = require("../models/driver_search_radius");

exports.getAllDrivers = (req, res) => {
    DriverModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate({
            path: 'dispacher_id',
            populate: {
                path: 'payment_detail_id',
                model: 'payment_details',
            }
        })
        .populate({
            path: 'vehicle_detail_id',
            populate: {
                path: 'condition_id',
                model: 'condition',
            }
        })
        .populate({
            path: 'vehicle_detail_id',
            populate: {
                path: 'car_type_id',
                model: 'car_type',
            }
        })
        .populate("doc_id")
}
exports.getDispacherDriver = (req, res) => {
    const DispacherId = req.params.dispacher_id;
    DriverModel.find({ dispacher_id: DispacherId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate({
        path: 'vehicle_detail_id',
        populate: {
            path: 'condition_id',
            model: 'condition',
        }
    })
        .populate({
            path: 'vehicle_detail_id',
            populate: {
                path: 'car_type_id',
                model: 'car_type',
            }
        })
        .populate("doc_id")
}

exports.getSpecificDriver = (req, res) => {
    const DriverId = req.params.DriverId;
    DriverModel.find({ _id: DriverId }, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    }).populate({
        path: 'dispacher_id',
        populate: {
            path: 'payment_detail_id',
            model: 'payment_details',
        }
    }).populate('payment_detail_id')
        .populate({
            path: 'vehicle_detail_id',
            populate: {
                path: 'condition_id',
                model: 'condition',
            }
        })
        .populate({
            path: 'vehicle_detail_id',
            populate: {
                path: 'car_type_id',
                model: 'car_type',
            }
        })
        .populate("doc_id")
}
exports.deleteDriver = (req, res) => {
    const DriverId = req.params.DriverId;
    DriverModel.deleteOne({ _id: DriverId }, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    })
}
exports.createDriver = async (req, res) => {
    // console.log(new Date)
    const Createddate = req.body.created_at;
    const Driver = new DriverModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        gender: req.body.gender,
        details: req.body.details,
        email: req.body.email,
        img: req.body.img,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        street_address: req.body.street_address,
        dispacher_id: req.body.dispacher_id,
        payment_detail_id:req.body.payment_detail_id,
        vehicle_detail_id: req.body.vehicle_detail_id,
        doc_id: req.body.doc_id,
        phoneno: req.body.phoneno,
        created_at: moment(Createddate).format("DD/MM/YYYY"),
        status: req.body.status,
        device_token: req.body.device_token,
        driver_location: req.body.driver_location,
        driver_lat: req.body.driver_lat,
        driver_log: req.body.driver_log,
        location: {
            type: 'Point',
            coordinates: [req.body.driver_log, req.body.driver_lat]
        }


    });
    try {
        const savedDriver = await Driver.save();
        res.json({
            data: savedDriver,
            message: "Driver Created successfully"
        })
    } catch (err) {
        res.status(400).send(err);
    }
}
exports.updateDriver = async (req, res) => {
    if (req.body.vehicle_detail_id === undefined) {
        const updateData = {
            name: req.body.name,
            gender: req.body.gender,
            details: req.body.details,
            email: req.body.email,
            img: req.body.img,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            country: req.body.country,
            street_address: req.body.street_address,
            dispacher_id: req.body.dispacher_id,
            payment_detail_id:req.body.payment_detail_id,
            vehicle_detail_id: req.body.vehicle_detail_id,
            doc_id: req.body.doc_id,
            phoneno: req.body.phoneno,
            status: req.body.status,
            device_token: req.body.device_token,
            driver_location: req.body.driver_location,
            driver_lat: req.body.driver_lat,
            driver_log: req.body.driver_log,
        }
        const options = {
            new: true
        }
        DriverModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
            if (error) {
                res.send(error)
            } else {
                res.send(result)
            }
        })
    } else {
        vehicleModel.find({ _id: req.body.vehicle_detail_id }, function (err, foundResult) {
            try {
                const vehicle_condition_id = foundResult[0].condition_id;
                const vehicle_car_type_id = foundResult[0].car_type_id;
                const vehicle_ac = foundResult[0].ac;
                const updateData = {
                    name: req.body.name,
                    gender: req.body.gender,
                    details: req.body.details,
                    email: req.body.email,
                    img: req.body.img,
                    city: req.body.city,
                    state: req.body.state,
                    zip_code: req.body.zip_code,
                    country: req.body.country,
                    street_address: req.body.street_address,
                    dispacher_id: req.body.dispacher_id,
                    vehicle_detail_id: req.body.vehicle_detail_id,
                    vehicle_condition_id: vehicle_condition_id,
                    vehicle_car_type_id: vehicle_car_type_id,
                    vehicle_ac: vehicle_ac,
                    doc_id: req.body.doc_id,
                    phoneno: req.body.phoneno,
                    status: req.body.status,
                    device_token: req.body.device_token,
                    driver_location: req.body.driver_location,
                    driver_lat: req.body.driver_lat,
                    driver_log: req.body.driver_log,
                }
                const options = {
                    new: true
                }
                DriverModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.send(result)
                        const updateData1 = {
                            $push: {
                                driver_Id: result,
                            }
                        }
                        const options = {
                            new: true
                        }
                        vehicleModel.findByIdAndUpdate(req.body.vehicle_detail_id, updateData1, options, (error, result) => {
                            if (error) {
                                res.send(error)
                            } else {
                                // res.send(result)
                            }
                        })
                    }
                })
            } catch (err) {
                res.json(err)
            }
        })

    }

}

exports.getSearchOrder = async (req, res) => {
    const DriverId = req.params.DriverId

    DriverModel.find({ _id: DriverId }, async function (err, foundResult) {
        try {
            // res.json(foundResult[0])
            const conditionId = foundResult[0].vehicle_condition_id;
            const vehicle_car_type_id = foundResult[0].vehicle_car_type_id;
            const vehicle_ac = foundResult[0].vehicle_ac;
            const driver_lat = foundResult[0].driver_lat;
            const driver_log = foundResult[0].driver_log;
            driver_search_radius.find({},async function (err, foundResult) {
                try {
                    // res.json(foundResult[0].radius)
                    const distanceRadius = foundResult[0].radius;
                    let ArrayCond = [];
                    ArrayCond = await orderModel.aggregate([
                        {
                            $geoNear: {
                                near: {
                                    type: 'Point',
                                    coordinates: [parseFloat(driver_log), parseFloat(driver_lat)]
                                },
                                maxDistance: parseInt(distanceRadius),
                                distanceField: 'distance',
                            }
                        },
                        {
                            $match: {
                                condition_id: mongoose.Types.ObjectId(conditionId),
                                car_type_id: mongoose.Types.ObjectId(vehicle_car_type_id),
                                ac: vehicle_ac,
                                status:'schedule'
                            }
                        },
                    ])
                    return res.json(ArrayCond)
                } catch (err) {
                    res.json(err)
                }
            })


        } catch (err) {
            res.json(err)
        }
    })


}



