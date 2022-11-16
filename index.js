const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 4000;
const cors = require('cors');
const socket = require("socket.io");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

require('dotenv').config()
//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);
//middleware
app.use(express.json());
app.use('/image-uploads', express.static('image-uploads'))
//Routes
app.use("/api/admin" , require("./routes/adminRoute"));
app.use("/api/dispacher" , require("./routes/dispacherRoute"));
app.use("/api/paymentDetail" , require("./routes/paymentDetailRoute"));
app.use("/api/hotel" , require("./routes/hotelRoute"));
app.use("/api/hotelType" , require("./routes/hotelTypeRoute"));
app.use("/api/guest" , require("./routes/guestRoute"));
app.use("/api/carType" , require("./routes/carTypeRoute"));
app.use("/api/condition" , require("./routes/conditionRoute"));
app.use("/api/vehicle" , require("./routes/vehicleRoute"));
app.use("/api/driver" , require("./routes/driverRoute"));
app.use("/api/driverDoc" , require("./routes/driver_documentsRoute"));
app.use("/api/phoneNo" , require("./routes/phoneNoCheckRoute"));
app.use("/api/comission" , require("./routes/comissionRoute"));
app.use("/api/driver_search_radius" , require("./routes/driver_search_radiusRoute"));
app.use("/api/rate_per_km" , require("./routes/rate_per_kmRoute"));
app.use("/api/sms" , require("./routes/sendSMS"));
app.use("/api/notification" , require("./routes/notificationRoute"));
app.use("/api/Msg" , require("./routes/msgRoute"));
app.use("/api/Order" , require("./routes/orderRoute"));
app.use("/api/invoice" , require("./routes/invoiceRoute"));
app.use("/api/Rating" , require("./routes/ratingRoute"));

app.use('/upload-image', require('./upload-image'))
app.use('/delete-image', require('./delete-image'))
const server= app.listen(PORT, function () {
    console.log("server started on port 4000")
})
//Sockets
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
