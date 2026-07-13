const Ticket = require("../models/Ticket");


// Create Ticket
const createTicket = async (req, res) => {
  try {

    const ticket = await Ticket.create({
      employee: req.user.id,
      category: req.body.category,
      subject: req.body.subject,
      description: req.body.description,
    });


    res.status(201).json({
      message: "Ticket Created Successfully",
      ticket,
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};



// View My Tickets
const getMyTickets = async (req, res) => {

  try {

    const tickets = await Ticket.find({
      employee: req.user.id,
    }).sort({
      createdAt: -1,
    });


    res.json(tickets);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  createTicket,
  getMyTickets,
};
