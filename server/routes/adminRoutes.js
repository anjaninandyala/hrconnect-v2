const express = require("express");

const {
  getPendingEmployees,
  getDashboardStats,
  approveEmployee,
  rejectEmployee,
  getApprovedEmployees,
  getEmployeeById,
} = require(
  "../controllers/adminController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/pending",
  protect,
  getPendingEmployees
);

router.get(
  "/dashboard",
  protect,
  getDashboardStats
);

router.put(
  "/approve/:id",
  protect,
  approveEmployee
);

router.put(
  "/reject/:id",
  protect,
  rejectEmployee
);
router.get(
  "/employees",
  protect,
  getApprovedEmployees
);
router.get(
  "/employees/:id",
  protect,
  getEmployeeById
);
module.exports = router;