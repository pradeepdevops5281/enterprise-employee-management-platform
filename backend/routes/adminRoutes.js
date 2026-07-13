const express = require("express");
const router = express.Router();


const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");


const {
  getEmployees
} = require("../controllers/adminController");



router.get(
  "/employees",
  protect,
  authorize("admin"),
  getEmployees
);


module.exports = router;
