const invoiceModel = require("../models/invoiceModel");
const mongoose = require("mongoose");
const moment = require('moment');
const orderModel = require("../models/orderModel");
exports.getAllInvoices = (req, res) => {
    invoiceModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('order_id' )
        .populate('hotel_id' )
        .populate('guest_id' )
        .populate('driver_id' )



      
}
exports.getDriverTransactionCompleted = (req, res) => {
    const DriverId = req.params.driver_id;
    invoiceModel.find({ driver_id: DriverId }, function (err, foundResult) {
      try {
        res.json(foundResult)
      } catch (err) {
        res.json(err)
      }
    }).populate('order_id' )
    .populate('hotel_id' )
    .populate('guest_id' )
    .populate('driver_id' )
  
  }
  exports.getHotelTransactionCompleted = (req, res) => {
    const HotelId = req.params.hotel_id;
    invoiceModel.find({ hotel_id: HotelId }, function (err, foundResult) {
      try {
        res.json(foundResult)
      } catch (err) {
        res.json(err)
      }
    }).populate('order_id' )
    .populate('hotel_id' )
    .populate('guest_id' )
    .populate('driver_id' )
  
  }
  exports.getGuestsTransactionCompleted = (req, res) => {
    const GuestId = req.params.guest_id;
    invoiceModel.find({ guest_id: GuestId }, function (err, foundResult) {
      try {
        res.json(foundResult)
      } catch (err) {
        res.json(err)
      }
    }).populate('order_id' )
    .populate('hotel_id' )
    .populate('guest_id' )
    .populate('driver_id' )
  
  }
  exports.getOrderTransactionCompleted = (req, res) => {
    const OrderId = req.params.order_id;
    invoiceModel.find({ order_id: OrderId }, function (err, foundResult) {
      try {
        res.json(foundResult)
      } catch (err) {
        res.json(err)
      }
    }).populate('order_id' )
    .populate('hotel_id' )
    .populate('guest_id' )
    .populate('driver_id' )
  
  }

exports.getSpecificInvoice = (req, res) => {
    const InvoiceId = req.params.InvoiceId;
    invoiceModel.find({ _id: InvoiceId }, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    })
    .populate('order_id' )
    .populate('hotel_id' )
    .populate('guest_id' )
    .populate('driver_id' )
}
exports.deleteInvoice = (req, res) => {
    const InvoiceId = req.params.InvoiceId;
    invoiceModel.find({ _id: InvoiceId }, function (err, foundResult) {
        try {
            // res.json(foundResult);
            const order_id = foundResult[0].order_id
            const updateData = {
                $pull: {
                    Invoice: InvoiceId,
                },
            }
            const options = {
                new: true
            }
            orderModel.findByIdAndUpdate(order_id, updateData, options, (error, result) => {
                if (error) {
                    res.send(error)
                } else {
                    invoiceModel.deleteOne({ _id: InvoiceId }, function (err, foundResult) {
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
exports.createInvoice = async (req, res) => {
    const Createddate = req.body.created_at;
    orderModel.findById(req.body.order_id, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            const Invoice = new invoiceModel({
                _id: mongoose.Types.ObjectId(),
                order_id: req.body.order_id,
                hotel_id:result.hotel_id,
                guest_id:result.guest_id,
                driver_id:result.driver_id,
                status: req.body.status,
                created_at: moment(Createddate).format("DD/MM/YYYY"),
            })
            Invoice.save((error, result) => {
                if (error) {
                    res.send(error)
                } else {
                    res.send(result)
                    const updateData1 = {
                        $push: {
                            Invoice: result,
                        }
                    }
                    const options1 = {
                        new: true
                    }
                    orderModel.findByIdAndUpdate(req.body.order_id, updateData1, options1, (error, result) => {
                        if (error) {
                            res.send(error)
                        } else {
                        }
                    })
                }
            })
        }
    })
  
}
exports.updateInvoice = async (req, res) => {
    const Createddate = req.body.created_at;
    const updateData = {
        status: req.body.status,
        created_at: moment(Createddate).format("DD/MM/YYYY"),
    }
    const options = {
        new: true
    }
    invoiceModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })
}



