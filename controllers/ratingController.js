const ratingModel = require("../models/ratingReviewsModel");
const mongoose = require("mongoose");
const moment = require('moment');
const collect = require('collect.js');
const orderModel = require("../models/orderModel");
const driverModel = require("../models/driverModel");
exports.getAllRatings = (req, res) => {
    ratingModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('order_id')
        .populate('rated_by_guest_id')
        .populate('driver_id')
}

exports.getSpecificRating = (req, res) => {
    const RatingId = req.params.RatingId;
    ratingModel.find({ _id: RatingId }, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    }).populate('order_id')
        .populate('rated_by_guest_id')
        .populate('driver_id')
}
exports.getDriverRatings= (req, res) => {
    const driverId = req.params.DriverId;
    ratingModel.find({ driver_id:driverId }, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    }).populate('order_id')
    .populate('rated_by_guest_id')
    .populate('driver_id')
    // .populate('order_id')
    //     .populate('rated_by_guest_id')
    //     .populate('driver_id')
}
exports.deleteRating = (req, res) => {
    const RatingId = req.params.RatingId;
    ratingModel.find({ _id: RatingId }, function (err, foundResult) {
        try {
            // res.json(foundResult);
            const driver_id = foundResult[0].driver_id
            const updateData = {
                $pull: {
                    ratings: RatingId,
                },
            }
            const options = {
                new: true
            }
            driverModel.findByIdAndUpdate(driver_id, updateData, options, (error, result) => {
                if (error) {
                    res.send(error)
                } else {
                    ratingModel.deleteOne({ _id: RatingId }, function (err, foundResult) {
                        try {
                            res.json(foundResult)
                        } catch (err) {
                            res.json(err)
                        }
                    })
                }
            })
        } catch (err) {
            res.json(err)
        }
    })
}
exports.createRating = async (req, res) => {
    const orderId = req.body.order_id;
    orderModel.find({ _id: orderId }, function (err, foundResult) {
        try {
            // res.json(foundResult[0].guest_id);
            const GuestId = foundResult[0].guest_id;
            const DriverId = foundResult[0].driver_id;
            const Rating = new ratingModel({
                _id: mongoose.Types.ObjectId(),
                order_id: req.body.order_id,
                rated_by_guest_id: GuestId,
                driver_id: DriverId,
                star: req.body.star,
                review: req.body.review,
            })
            Rating.save((error, result) => {
                if (error) {
                    res.send(error)
                } else {
                    res.send(result)
                    const updateData1 = {
                        $push: {
                            ratings: result,
                        }
                    }
                    const options1 = {
                        new: true
                    }
                    driverModel.findByIdAndUpdate(DriverId, updateData1, options1, (error, result) => {
                        if (error) {
                            res.send(error)
                        } else {
                        }
                    })
                }
            })

        } catch (err) {
            res.json(err)
        }
    })

}
exports.updateRating = async (req, res) => {
    const updateData = {
        order_id: req.body.order_id,
        rated_by_guest_id: GuestId,
        driver_id: DriverId,
        star: req.body.star,
        review: req.body.review,
    }
    const options = {
        new: true
    }
    ratingModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })
}
exports.getTotalRatingDriver = (req, res) => {
    const driverId = req.params.DriverId;
    ratingModel.find({ driver_id:driverId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            //  res.json(foundResult)
            var newArr = result.map(function (val, index) {
                return {
                    value: val.star
                };
            })
            let total = 0;
            // Count Number of elements
            const dataCount = collect(newArr);
            const totalCount = dataCount.count();
            //   calculate total 
            newArr.forEach(element => {
                total = parseInt(total) + parseInt(element.value)
            });
            // console.log(total)
            // console.log(totalCount)
            let Rating = ((total/5)/totalCount)*5;
            // console.log()
            let RatingFinal=Rating.toFixed(0);
            res.status(200).json(RatingFinal)
        }
    }
    )
}


