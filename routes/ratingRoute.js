const router = require("express").Router();
const controller= require("../controllers/ratingController")

router.get("/allRatings" ,controller.getAllRatings)
router.get("/specificRating/:RatingId" , controller.getSpecificRating)
router.delete("/deleteRating/:RatingId" , controller.deleteRating);
router.post("/createRating" , controller.createRating);
router.put("/updateRating" , controller.updateRating);
router.get("/getDriverRating/:DriverId" , controller.getDriverRatings);

router.get("/getTotalRatingDriver/:DriverId" , controller.getTotalRatingDriver);

// router.put("/loginRating" , controller.loginRating);


module.exports = router;