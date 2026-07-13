const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getAllLeaves,
  getMyLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController");

const authMiddleware = require("../middleware/authMiddleware");


// Employee Apply Leave
router.post("/apply", authMiddleware, applyLeave);


// Employee View Own Leaves
router.get("/my", authMiddleware, getMyLeaves);


// HR View All Leaves
router.get("/all", authMiddleware, getAllLeaves);


// HR Approve / Reject Leave
router.put("/:id/status", authMiddleware, updateLeaveStatus);


module.exports = router;
