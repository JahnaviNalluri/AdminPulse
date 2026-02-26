const User = require("../models/User");
const Content = require("../models/Content");

/* =====================================================
   📊 Dashboard Summary Data
===================================================== */
const getDashboardData = async () => {

  const totalUsers = await User.countDocuments({ role: "user" });

  const activeUsers = await User.countDocuments({
    role: "user",
    isActive: true
  });

  const totalAdmins = await User.countDocuments({ role: "admin" });

  const totalContent = await Content.countDocuments();

  return {
    totalUsers,
    activeUsers,
    totalAdmins,
    totalContent
  };
};


/* =====================================================
   📈 Monthly User Signups
===================================================== */
const getMonthlySignups = async () => {

  const data = await User.aggregate([
    { $match: { role: "user" } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);

  return data.map(item => ({
    year: item._id.year,
    month: item._id.month,
    count: item.count
  }));
};


/* =====================================================
   📝 Content Analytics (Total + Monthly)
===================================================== */
const getContentAnalytics = async () => {

  const totalContent = await Content.countDocuments();

  const monthlyContent = await Content.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);

  return {
    totalContent,
    monthlyContent: monthlyContent.map(item => ({
      year: item._id.year,
      month: item._id.month,
      count: item.count
    }))
  };
};


module.exports = {
  getDashboardData,
  getMonthlySignups,
  getContentAnalytics
};