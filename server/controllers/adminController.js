const Employee = require("../models/Employee");

/*
------------------------------------
GET PENDING EMPLOYEES
------------------------------------
*/

const getPendingEmployees = async (
  req,
  res
) => {
  try {

    const employees =
      await Employee.find({
        status: "pending",
      }).populate(
        "user",
        "name email"
      );

    res.json(employees);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch pending employees",
    });

  }
};

/*
------------------------------------
GET DASHBOARD STATS
------------------------------------
*/

const getDashboardStats = async (
  req,
  res
) => {
  try {

    const totalEmployees =
      await Employee.countDocuments();

    const pending =
      await Employee.countDocuments({
        status: "pending",
      });

    const approved =
      await Employee.countDocuments({
        status: "approved",
      });

    const rejected =
      await Employee.countDocuments({
        status: "rejected",
      });

    /*
    ---------------------------
    DEPARTMENT CHART
    ---------------------------
    */

    const departmentChart =
      await Employee.aggregate([
        {
          $match: {
            "professionalDetails.department": {
              $exists: true,
              $ne: "",
            },
          },
        },
        {
          $group: {
            _id:
              "$professionalDetails.department",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 0,
            department: "$_id",
            count: 1,
          },
        },
      ]);

    /*
    ---------------------------
    MONTHLY ONBOARDING
    ---------------------------
    */

    const monthlyData =
      await Employee.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month:
                  "$createdAt",
              },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]);

    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const onboardingChart =
      monthlyData.map(
        (item) => ({
          month:
            monthNames[
              item._id.month
            ],
          count:
            item.count,
        })
      );

    /*
    ---------------------------
    DOCUMENTS COUNT
    ---------------------------
    */

    const allEmployees =
      await Employee.find();

    const documentsUploaded =
      allEmployees.reduce(
        (total, employee) =>
          total +
          (employee.documents?.length || 0),
        0
      );

    /*
    ---------------------------
    DEPARTMENTS COUNT
    ---------------------------
    */

    const departments =
      departmentChart.length;

    /*
    ---------------------------
    RECENT ACTIVITY
    ---------------------------
    */

    const recentEmployees =
      await Employee.find()
        .sort({
          updatedAt: -1,
        })
        .limit(10);

    const recentActivity =
      recentEmployees.map(
        (employee) => ({
          id:
            employee._id,

          employee:
            employee.personalDetails
              ?.fullName ||
            "Employee",

          action:
            employee.status,

          timestamp:
            employee.updatedAt,
        })
      );

    res.json({
      totalEmployees,
      pending,
      approved,
      rejected,

      departments,
      documentsUploaded,

      departmentChart,
      onboardingChart,

      recentActivity,
    });

  } catch (error) {

    console.log(
      "DASHBOARD ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to load dashboard stats",
    });

  }
};
/*
/*
------------------------------------
APPROVE EMPLOYEE
------------------------------------
*/

const approveEmployee = async (
  req,
  res
) => {
  try {

    const {
      department,
    } = req.body;

    const employee =
      await Employee.findById(
        req.params.id
      );

    if (!employee) {

      return res.status(404).json({
        message:
          "Employee not found",
      });

    }

    const approvedCount =
      await Employee.countDocuments({
        status: "approved",
      });

    const employeeCode =
      `EMP${1001 + approvedCount}`;

    employee.status =
      "approved";

    employee.employeeCode =
      employeeCode;

    /*
    ---------------------------
    HR ASSIGNS DEPARTMENT
    ---------------------------
    */

    if (department) {

      employee.professionalDetails.department =
        department;

    }

    await employee.save();

    res.json({
      message:
        "Employee approved successfully",
      employee,
    });

  } catch (error) {

    console.log(
      "APPROVE ERROR:",
      error
    );

    res.status(500).json({
      message:
        error.message,
    });

  }
};

/*
------------------------------------
REJECT EMPLOYEE
------------------------------------
*/

const rejectEmployee = async (
  req,
  res
) => {
  try {

    const employee =
      await Employee.findById(
        req.params.id
      );

    if (!employee) {
      return res.status(404).json({
        message:
          "Employee not found",
      });
    }

    employee.status =
      "rejected";

    await employee.save();

    res.json({
      message:
        "Employee rejected",
      employee,
    });

  } catch (error) {

    console.log(
      "REJECT ERROR:",
      error
    );

    res.status(500).json({
      message:
        error.message,
    });

  }
};

/*
------------------------------------
GET APPROVED EMPLOYEES
------------------------------------
*/

const getApprovedEmployees = async (
  req,
  res
) => {
  try {

    const employees =
      await Employee.find({
        status: "approved",
      }).populate(
        "user",
        "name email"
      );

    res.json(employees);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch employees",
    });

  }
};

/*
------------------------------------
GET SINGLE EMPLOYEE
------------------------------------
*/

const getEmployeeById = async (
  req,
  res
) => {
  try {

    const employee =
      await Employee.findById(
        req.params.id
      ).populate(
        "user",
        "name email"
      );

    if (!employee) {
      return res.status(404).json({
        message:
          "Employee not found",
      });
    }

    res.json(employee);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch employee",
    });

  }
};

module.exports = {
  getPendingEmployees,
  getDashboardStats,
  approveEmployee,
  rejectEmployee,
  getApprovedEmployees,
  getEmployeeById,
};