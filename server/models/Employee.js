const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employeeCode: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "approved",
        "rejected",
      ],
      default: "draft",
    },

    // Step 1
    personalDetails: {
      fullName: String,
      parentName: String,
      dateOfBirth: Date,

      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
      },
    },

    // Step 2
    addressDetails: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
    },

    // Step 3
    contactDetails: {
      mobileNumber: String,
      email: String,
    },

    // Step 4
    professionalDetails: {
      previousOrganization: String,
      companyName: String,
      designation: String,

      department: String,

      experienceStartDate: Date,
      experienceEndDate: Date,

      experienceYears: Number,
      experienceMonths: Number,
    },

    // Step 5
    emergencyDetails: {
      contactName: String,
      contactNumber: String,
      relationship: String,
    },

    // Step 6
    governmentDetails: {
      aadhaarNumber: String,
      panNumber: String,
      esiNumber: String,
      passportNumber: String,
    },

    // Step 7
    familyDetails: {
      fatherName: String,
      motherName: String,

      maritalStatus: {
        type: String,
        enum: [
          "Single",
          "Married",
        ],
      },

      spouseName: String,

      familyOccupation: String,
    },

    // Step 8
    documents: [
      {
        documentType: String,
        fileName: String,
        filePath: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Employee",
  employeeSchema
);