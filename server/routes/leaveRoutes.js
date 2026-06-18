const express =
  require("express");

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
} = require(
  "../controllers/leaveController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

/* Employee */

router.post(
  "/apply",
  protect,
  applyLeave
);

router.get(
  "/my",
  protect,
  getMyLeaves
);

/* Admin */

router.get(
  "/all",
  protect,
  getAllLeaves
);

router.put(
  "/approve/:id",
  protect,
  approveLeave
);

router.put(
  "/reject/:id",
  protect,
  rejectLeave
);

module.exports =
  router;