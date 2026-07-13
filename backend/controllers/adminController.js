const Employee = require("../models/Employee");


// View All Employees

const getEmployees = async (req, res) => {

  try {

    const employees = await Employee.find()
      .select("-password");


    res.json(employees);


  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }

};


module.exports = {
  getEmployees,
};
