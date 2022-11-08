const orderModel = require("../models/orderModel");
const mongoose = require("mongoose");
const moment = require('moment');
const UsersModel = require("../models/usersModel");
exports.getAllOrders = (req, res) => {
  orderModel.find({}, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)
    }
  }).sort({ $natural: -1 })
    .populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
  // .populate("driver_id")
}

exports.getSpecificOrder = (req, res) => {
  const OrderId = req.params.OrderId;
  orderModel.find({ _id: OrderId }, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  }).populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
}
exports.getHotelOrders = (req, res) => {
  const HotelId = req.params.hotelId;
  orderModel.find({ hotel_id: HotelId }, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  })
    .populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
}
exports.getHotelOrdersScheduled = (req, res) => {
  const HotelId = req.params.hotelId;
  orderModel.find({ hotel_id: HotelId , status: 'schedule'}, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  })
    .populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
}
exports.getHotelOrdersCompleted = (req, res) => {
  const HotelId = req.params.hotelId;
  orderModel.find({ hotel_id: HotelId , status: 'completed'}, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  })
    .populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
}
exports.getDriverOrders = (req, res) => {
  const DriverId = req.params.driverId;
  orderModel.find({ driver_id: DriverId, status: 'schedule' }, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  })
    .populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
}
exports.getDriverOrdersCompleted = (req, res) => {
  const DriverId = req.params.driverId;
  orderModel.find({ driver_id: DriverId, status: 'completed' }, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  })
    .populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
}
exports.getDriverOrdersOngoing = (req, res) => {
  const DriverId = req.params.driverId;
  orderModel.find({ driver_id: DriverId, status: 'ongoing' }, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  })
    .populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
}
exports.getDriverOrdersCancel = (req, res) => {
  const DriverId = req.params.driverId;
  orderModel.find({ driver_id: DriverId, status: 'cancel' }, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  })
    .populate("condition_id")
    .populate({
      path: 'guest_id',
      populate: {
        path: 'hotel_id',
        model: 'hotel',
      }
    })
    .populate("car_type_id")
    .populate({
      path: 'driver_id',
      populate: {
        path: 'dispacher_id',
        model: 'dispacher',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'vehicle_detail_id',
        model: 'vehicle_detail',
      }
    })
    .populate({
      path: 'driver_id',
      populate: {
        path: 'doc_id',
        model: 'driver_documents',
      }
    })
}
exports.deleteOrder = (req, res) => {
  const OrderId = req.params.OrderId;
  orderModel.deleteOne({ _id: OrderId }, function (err, foundResult) {
    try {
      res.json(foundResult)
    } catch (err) {
      res.json(err)
    }
  })
}
exports.createOrder = async (req, res) => {
  const Createddate = req.body.flight_date;
  const Order = new orderModel({
    _id: mongoose.Types.ObjectId(),
    guest_id: req.body.guest_id,
    hotel_id:req.body.hotel_id,
    pickup_location: req.body.pickup_location,
    pickup_log: req.body.pickup_log,
    pickup_lat: req.body.pickup_lat,
    location: {
      type: 'Point',
      coordinates: [req.body.pickup_log, req.body.pickup_lat]
  },
    dropoff_location: req.body.dropoff_location,
    dropoff_log: req.body.dropoff_log,
    dropoff_lat: req.body.dropoff_lat,
    condition_id: req.body.condition_id,
    car_type_id: req.body.car_type_id,
    ac: req.body.ac,
    flight_date: moment(Createddate).format("DD/MM/YYYY"),
    flight_time: moment(Createddate).format("h:mm:ss a"),
    driver_notes: req.body.driver_notes,
    estimated_amount: req.body.estimated_amount,
    total_amount: req.body.total_amount,
    status: req.body.status,
    cancellation_reason: req.body.cancellation_reason,
    canceled_by: req.body.canceled_by,
    canceled_by_id: req.body.canceled_by_id,
    driver_id: req.body.driver_id
  });
  try {
    const savedOrder = await Order.save();
    res.json({
      data: savedOrder,
      message: "Order Created successfully"
    })
  } catch (err) {
    res.status(400).send(err);
  }
}
exports.updateOrder = async (req, res) => {
  const Createddate = req.body.flight_date;
  const updateData = {
    guest_id: req.body.guest_id,
    pickup_location: req.body.pickup_location,
    pickup_log: req.body.pickup_log,
    pickup_lat: req.body.pickup_lat,
    dropoff_location: req.body.dropoff_location,
    dropoff_log: req.body.dropoff_log,
    dropoff_lat: req.body.dropoff_lat,
    condition_id: req.body.condition_id,
    car_type_id: req.body.car_type_id,
    ac: req.body.ac,
    flight_date: moment(Createddate).format("DD/MM/YYYY"),
    flight_time: req.body.flight_time,
    driver_notes: req.body.driver_notes,
    estimated_amount: req.body.estimated_amount,
    total_amount: req.body.total_amount,
    status: req.body.status,
    cancellation_reason: req.body.cancellation_reason,
    canceled_by: req.body.canceled_by,
    canceled_by_id: req.body.canceled_by_id,
    driver_id: req.body.driver_id
  }
  const options = {
    new: true
  }
  orderModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)
    }
  })

}
exports.AcceptOrder = async (req, res) => {
  const updateData = {
    driver_id: req.body.driver_id,
    status:req.body.status
  }
  const options = {
    new: true
  }
  orderModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)

     
      const user = new UsersModel({
        _id: mongoose.Types.ObjectId(),
        name: result.guest_id.name,
        image: result.guest_id.img,
        order_id:result._id,
        userId: result.guest_id._id
      })
      user.save((error, result) => {
        if (error) {
          res.send(error)
        } else {
          // res.send(result)
        }
      })
    }
    const userDriver = new UsersModel({
      _id: mongoose.Types.ObjectId(),
      name: result.driver_id.name,
      image: result.driver_id.img,
      order_id:result._id,
      userId: result.driver_id._id
    })
    userDriver.save((error, result) => {
      if (error) {
        res.send(error)
      } else {
        // res.send(result)
      }
    })
  
  }).populate('guest_id').populate('driver_id')

}



