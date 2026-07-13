const Employee = require("../models/Employee");

const getProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select("-password");

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
};
