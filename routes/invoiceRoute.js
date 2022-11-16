const router = require("express").Router();
const controller= require("../controllers/invoiceController")

router.post("/createInvoice" , controller.createInvoice);
router.get("/allInvoices" , controller.getAllInvoices);
router.get("/specificInvoice/:InvoiceId" , controller.getSpecificInvoice);
router.delete("/deleteInvoice/:InvoiceId" , controller.deleteInvoice);
router.put("/updateInvoice" , controller.updateInvoice);
router.get("/getDriverTransactionCompleted/:driver_id" , controller.getDriverTransactionCompleted);
router.get("/getGuestsTransactionCompleted/:guest_id" , controller.getGuestsTransactionCompleted);
router.get("/getHotelTransactionCompleted/:hotel_id" , controller.getHotelTransactionCompleted);
router.get("/getOrderTransactionCompleted/:order_id" , controller.getOrderTransactionCompleted);


module.exports = router;

