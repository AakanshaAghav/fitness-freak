const express = require("express");
const router = express.Router();
const { updateProfile, getProfile } = require("../controllers/UserControllers");

router.put("/update-profile", updateProfile);
router.get("/profile", getProfile);

module.exports = router;
