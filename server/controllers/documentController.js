const Employee = require("../models/Employee");

const uploadDocument = async (req, res) => {
  try {

    console.log("UPLOAD REQUEST RECEIVED");
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const { documentType } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const employee = await Employee.findOne({
      user: req.user._id,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    employee.documents.push({
      documentType: documentType || "Document",

      fileName: req.file.filename,

      filePath:
        `/uploads/${req.file.filename}`,
    });

    await employee.save();

    console.log(
      "DOCUMENT SAVED:",
      employee.documents[
      employee.documents.length - 1
      ]
    );

    res.status(200).json({
      message: "Document Uploaded Successfully",
      document:
        employee.documents[
        employee.documents.length - 1
        ],
    });

  } catch (error) {

    console.log(
      "UPLOAD ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  uploadDocument,
};