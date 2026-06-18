const express = require("express");

const {
  saveDraft,
  getMyEmployeeProfile,
  submitOnboarding,
  getStatus,
} = require("../controllers/employeeController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/me",
  protect,
  getMyEmployeeProfile
);

router.post(
  "/save-draft",
  protect,
  saveDraft
);

router.post(
  "/submit",
  protect,
  submitOnboarding
);

router.get(
  "/status",
  protect,
  getStatus
);

module.exports = router;