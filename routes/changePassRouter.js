const express = require("express");
const bcrypt = require("bcrypt");
const { isAuthorised } = require("../middleware/isAuth");
const { User } = require("../models/user");




const router = express.Router();


router.post("/user/passChange", isAuthorised,
    async(req , res)=>{
        try {

            const {currentPass, newPass, confirmNewPass} = req.body;

            if (!currentPass || !newPass || !confirmNewPass) {
                return res.status(400).json({ message: "All fields are required." });
              }

              if (newPass !== confirmNewPass) {
                return res.status(400).json({ message: "New passwords do not match." });
              }

              const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPass, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect." });
      }

      const hashedPass = await bcrypt.hash(newPass , 10);

      user.password = hashedPass;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
            
        } catch (error) {
            
            console.error("Error changing password:", error);
            res.status(500).json({ message: "Internal server error." });

        }
    }
)

module.exports = router;