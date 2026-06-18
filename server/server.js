const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const documentRoutes = require("./routes/documentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
dotenv.config();

connectDB();

const app = express();

/*
------------------------------------
MIDDLEWARE
------------------------------------
*/

app.use(cors());
app.use(express.json());

/*
------------------------------------
STATIC FILES
------------------------------------
*/

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/*
------------------------------------
API ROUTES
------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/employee",
  employeeRoutes
);

app.use(
  "/api/documents",
  documentRoutes
);

app.use(
  "/api/leaves",
  leaveRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

/*
------------------------------------
HEALTH CHECK
------------------------------------
*/

app.get("/", (req, res) => {
  res.send("HRConnect API Running");
});

/*
------------------------------------
START SERVER
------------------------------------
*/

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});