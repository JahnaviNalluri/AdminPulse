const express=require("express");
const cors=require("cors");
const userRouter=require("./routes/userRouter.js");
const analyticsRouter = require("./routes/analyticsRouter.js");
const contentRouter = require("./routes/contentRouter");



const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use("/api/analytics", analyticsRouter);
app.use("/api/content", contentRouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("user API is running");
});

module.exports=app;