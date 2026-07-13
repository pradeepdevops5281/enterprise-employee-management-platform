const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getAllEmployees,
  getAllLeaves,
  getAllTickets,
  approveLeave,
  rejectLeave,
} = require("../controllers/hrController");

// ===============================
// Employee Management Routes
// ===============================

// Get all employees
router.get(
  "/employees",
  protect,
  authorize("hr", "admin"),
  getAllEmployees
);

// ===============================
// Leave Management Routes
// ===============================

// Get all leave requests
router.get(
  "/leaves",
  protect,
  authorize("hr", "admin"),
  getAllLeaves
);

// Approve leave request
router.put(
  "/leaves/:id/approve",
  protect,
  authorize("hr", "admin"),
  approveLeave
);

// Reject leave request
router.put(
  "/leaves/:id/reject",
  protect,
  authorize("hr", "admin"),
  rejectLeave
);

// ===============================
// Ticket Management Routes
// ===============================

// Get all support tickets
router.get(
  "/tickets",
  protect,
  authorize("hr", "admin"),
  getAllTickets
);

module.exports = router;
