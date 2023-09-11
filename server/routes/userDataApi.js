const express = require("express");
const user = require("../Schemas/userSchema");
const jwt = require("jsonwebtoken");
const router = express.Router();
// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

//show all users from database with pagination
router.get("/all", authenticateUser, async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const users = await user
      .find({}, { password: 0 })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const count = await user.countDocuments();
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
module.exports = router;
