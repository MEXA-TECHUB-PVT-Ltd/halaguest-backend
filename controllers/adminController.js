const adminModel = require("../models/adminModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const forgetPasswordModel = require("../models/forgetPasswordModel");
var nodemailer = require('nodemailer')

exports.getAlladmins = (req, res) => {
    adminModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}

exports.getSpecificadmin = (req, res) => {
    const adminId = req.params.adminId;
    adminModel.find({ _id: adminId }, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    })
}
exports.loginAdmin = (req, res) => {
    const findUser = {
        email: req.body.email
    }
    adminModel.findOne(findUser, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    res.send(result)
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(404)
            }
        }
    })
}
exports.forgetPasswordAdmin = async (req, res) => {
    let data = await adminModel.findOne({
        email: req.body.email
    });
    const responseType = {};
    responseType.data = data
    console.log(data)
    if (data) {
        let otpcode = Math.floor((Math.random() * 10000) + 1);
        let otpData = new forgetPasswordModel({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            code: otpcode,
            expiresIn: new Date().getTime() + 300 * 1000
        })
        let otpResponse = await otpData.save();
        responseType.statusText = 'Success'
        mailer(req.body.email, otpcode)
        console.log(otpcode)
        responseType.message = 'Please check Your Email Id';
        responseType.otp = otpcode;
    } else {
        responseType.statusText = 'error'
        responseType.message = 'Email Id not Exist';
    }
    res.status(200).json(responseType)
}
const mailer = (email, otp) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'rimshanimo22@gmail.com',
            pass: 'oespmdfxhmbhrxgd'
        }
    });
    transporter.verify().then(console.log).catch(console.error);

    // send mail with defined transport object
    var mailOptions = {
        from: 'rimshanimo22@gmail.com',
        to: email,
        subject: `OTP code is ` + otp,
        text: `Email Verification :OTP code is ` + otp,

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            // console.log('Email sent ' + info.response)
        }
    });
}
exports.deleteadmin = (req, res) => {
    const adminId = req.params.adminId;
    adminModel.findByIdAndDelete(adminId, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
exports.createadmin = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    adminModel.find({ email: req.body.email }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const admin = new adminModel({
                    _id: mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    img: req.body.img,
                    privacy_policy: req.body.privacy_policy,
                    terms_and_conditions: req.body.terms_and_conditions,

                });
                admin.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.send(result)
                    }
                })

            } else {
                res.json("Email Already Exist")

            }
        }
    })

}
exports.updateadmin = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    const updateData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        img: req.body.img,
        privacy_policy: req.body.privacy_policy,
        terms_and_conditions: req.body.terms_and_conditions,
    }
    const options = {
        new: true
    }
    adminModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })
}



