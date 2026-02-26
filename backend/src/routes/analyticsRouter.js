const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getMonthlySignups,
  getContentAnalytics,

} = require("../controllers/analyticsController");

router.get("/dashboard", getDashboard);
router.get("/monthly-signups", getMonthlySignups);
router.get("/content-analytics", getContentAnalytics);

module.exports = router;