const Leave = require("../models/Leave");


// Employee Apply Leave
const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    const leave = await Leave.create({
      employee: req.user.id,
      fromDate,
      toDate,
      reason,
    });

    res.status(201).json({
      message: "Leave Applied Successfully",
      leave,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// HR View All Leaves
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate(
      "employee",
      "fullName email department designation"
    );

    res.status(200).json(leaves);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Employee View Own Leaves
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      employee: req.user.id,
    });

    res.status(200).json(leaves);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// HR Approve / Reject Leave
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Leave Status Updated Successfully",
      leave,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  applyLeave,
  getAllLeaves,
  getMyLeaves,
  updateLeaveStatus,
};
