const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected"
    );

    const existingAdmin =
      await User.findOne({
        email:
          "admin@hrconnect.com",
      });

    console.log(
      "Existing Admin:",
      existingAdmin
        ? "FOUND"
        : "NOT FOUND"
    );

    if (existingAdmin) {
      console.log(
        "Admin already exists"
      );

      process.exit(0);
    }

    const hashedPassword =
      await bcrypt.hash(
        "Admin@123",
        10
      );

    const admin =
      await User.create({
        name:
          "System Admin",

        email:
          "admin@hrconnect.com",

        password:
          hashedPassword,

        role:
          "admin",

        isActive: true,
      });

    console.log(
      "Admin Created Successfully"
    );

    console.log(admin);

    process.exit(0);

  } catch (error) {

    console.error(
      "Seeder Error:",
      error
    );

    process.exit(1);
  }
};

createAdmin();