const mongoose = require("mongoose");
const guestSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    img: String,
    email: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,
    street_address: String,
    name: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    details: String,
    hotel_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel'
    }],

}
);
module.exports = mongoose.model("guest", guestSchema);