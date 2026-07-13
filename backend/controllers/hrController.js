const Employee = require("../models/Employee");
const Leave = require("../models/Leave");
const Ticket = require("../models/Ticket");

// ===============================
// HR View All Employees
// ===============================
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password");

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// HR View All Leave Requests
// ===============================
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate(
        "employee",
        "fullName email department designation"
      )
      .populate(
        "approvedBy",
        "fullName email"
      );

    res.json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Approve Leave Request
// ===============================
const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        message: "Leave request not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        message: `Leave request is already ${leave.status}`,
      });
    }

    leave.status = "approved";
    leave.approvedBy = req.user.id;
    leave.approvedAt = new Date();

    await leave.save();

    res.status(200).json({
      message: "Leave approved successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Reject Leave Request
// ===============================
const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        message: "Leave request not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        message: `Leave request is already ${leave.status}`,
      });
    }

    leave.status = "rejected";
    leave.approvedBy = req.user.id;
    leave.approvedAt = new Date();

    await leave.save();

    res.status(200).json({
      message: "Leave rejected successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// HR View All Tickets
// ===============================
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate(
        "employee",
        "fullName email department"
      );

    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllEmployees,
  getAllLeaves,
  getAllTickets,
  approveLeave,
  rejectLeave,
};
