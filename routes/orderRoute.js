const router = require("express").Router();
const controller= require("../controllers/orderController")

router.post("/createOrder" , controller.createOrder);
router.get("/allOrders" , controller.getAllOrders);
router.get("/specificOrder/:OrderId" , controller.getSpecificOrder);
router.delete("/deleteOrder/:OrderId" , controller.deleteOrder);
router.put("/updateOrder" , controller.updateOrder);
router.get("/driverOrders/:driverId" , controller.getDriverOrders);
router.get("/hotelOrders/:hotelId" , controller.getHotelOrders);
router.get("/hotelOrdersScheduled/:hotelId" , controller.getHotelOrdersScheduled);
router.get("/hotelOrdersCompleted/:hotelId" , controller.getHotelOrdersCompleted);
router.get("/driverOrdersCompleted/:driverId" , controller.getDriverOrdersCompleted);
router.get("/driverOrdersOngoing/:driverId" , controller.getDriverOrdersOngoing);
router.get("/driverOrdersCancel/:driverId" , controller.getDriverOrdersCancel);
router.put("/AcceptOrder" , controller.AcceptOrder);

module.exports = router;

