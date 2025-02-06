const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const router = express.Router();

router.post("/user/resetPass/:id", async(req,res)=>{
    try {
        
        const{id}=req.params;
        const {newPass} = req.body;

        if(!newPass){
            return res.status(400).json({ message: "Filed should not be empty" });
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const hashedPass = await bcrypt.hash(newPass, 10);

        user.password = hashedPass;
        await user.save();
        res.status(200).json({ message: "Password reset successfully! You can now log in with your new password." });

    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error." });
    }
})

module.exports = router;