const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

/*
------------------------
Apply Leave
------------------------
*/

const applyLeave = async (
  req,
  res
) => {
  try {

    const employee =
      await Employee.findOne({
        user: req.user._id,
      });

    if (!employee) {
      return res.status(404).json({
        message:
          "Employee not found",
      });
    }

    const leave =
      await Leave.create({
        employee:
          employee._id,

        leaveType:
          req.body.leaveType,

        fromDate:
          req.body.fromDate,

        toDate:
          req.body.toDate,

        reason:
          req.body.reason,
      });

    res.status(201).json(leave);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

/*
------------------------
Employee Leave History
------------------------
*/

const getMyLeaves =
  async (req, res) => {
    try {

      const employee =
        await Employee.findOne({
          user: req.user._id,
        });

      const leaves =
        await Leave.find({
          employee:
            employee._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        leaves
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };
/*
------------------------
Admin Get All Leaves
------------------------
*/

const getAllLeaves =
  async (req, res) => {
    try {

      const leaves =
        await Leave.find()
          .populate({
            path: "employee",
            populate: {
              path: "user",
              select:
                "name email",
            },
          })
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        leaves
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

/*
------------------------
Approve Leave
------------------------
*/

const approveLeave =
  async (req, res) => {

    try {

      const leave =
        await Leave.findById(
          req.params.id
        );

      if (!leave) {
        return res.status(404).json({
          message:
            "Leave not found",
        });
      }

      leave.status =
        "approved";

      await leave.save();

      res.status(200).json(
        leave
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

/*
------------------------
Reject Leave
------------------------
*/

const rejectLeave =
  async (req, res) => {

    try {

      const leave =
        await Leave.findById(
          req.params.id
        );

      if (!leave) {
        return res.status(404).json({
          message:
            "Leave not found",
        });
      }

      leave.status =
        "rejected";

      await leave.save();

      res.status(200).json(
        leave
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };
module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
};