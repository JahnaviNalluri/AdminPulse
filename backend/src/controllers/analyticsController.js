const analyticsService = require("../services/analyticsService");


/* =========================================
   📊 Dashboard Summary
========================================= */
const getDashboard = async (req, res) => {
  try {
    const dashboardData = await analyticsService.getDashboardData();

    res.status(200).json({
      success: true,
      ...dashboardData
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/* =========================================
   📈 Monthly User Signups
========================================= */
const getMonthlySignups = async (req, res) => {
  try {
    const data = await analyticsService.getMonthlySignups();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};


/* =========================================
   📝 Content Analytics (Total + Monthly)
========================================= */
const getContentAnalytics = async (req, res) => {
  try {
    const data = await analyticsService.getContentAnalytics();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};








module.exports = {
  getDashboard,
  getMonthlySignups,
  getContentAnalytics,
};