const Employee = require("../models/Employee");

/*
------------------------------------
GET EMPLOYEE PROFILE
------------------------------------
*/

const getMyEmployeeProfile = async (
  req,
  res
) => {
  try {

    const employee =
      await Employee.findOne({
        user: req.user._id,
      });

    res.status(200).json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/*
------------------------------------
SAVE DRAFT
------------------------------------
*/

const saveDraft = async (
  req,
  res
) => {
  try {

    let employee =
      await Employee.findOne({
        user: req.user._id,
      });

    if (!employee) {

      employee =
        await Employee.create({
          user: req.user._id,
          ...req.body,
        });

    } else {

      // Preserve uploaded documents
      const existingDocuments =
        employee.documents || [];

      const updateData = {
        ...req.body,
      };

      // Prevent frontend draft save
      // from overwriting documents
      delete updateData.documents;

      employee =
        await Employee.findOneAndUpdate(
          {
            user: req.user._id,
          },
          {
            ...updateData,
            documents:
              existingDocuments,
          },
          {
            returnDocument:
              "after",
          }
        );

    }

    res.status(200).json({
      message: "Draft Saved",
      employee,
    });

  } catch (error) {

    console.log(
      "SAVE DRAFT ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }
};

/*
------------------------------------
SUBMIT ONBOARDING
------------------------------------
*/

const submitOnboarding = async (
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
          "Employee profile not found",
      });
    }

    employee.status =
      "pending";

    await employee.save();

    res.status(200).json({
      message:
        "Submitted Successfully",
      employee,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/*
------------------------------------
DASHBOARD STATUS
------------------------------------
*/

const getStatus = async (
  req,
  res
) => {
  try {

    const employee =
      await Employee.findOne({
        user: req.user._id,
      });

    if (!employee) {

      return res.status(200).json({
        status: "draft",
        employeeCode: null,
      });

    }

    res.status(200).json({
      status:
        employee.status,

      employeeCode:
        employee.employeeCode,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  saveDraft,
  getMyEmployeeProfile,
  submitOnboarding,
  getStatus,
};