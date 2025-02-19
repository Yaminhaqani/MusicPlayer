const express = require("express");
const { isAuthorised } = require("../middleware/isAuth");
const { User } = require("../models/user");
const { isAdmin } = require("../middleware/isAdmin");



const router = express.Router();

router.get("/user/details", isAuthorised, async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password"); // Exclude password
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });

  router.get('/admin/allUserInfo', isAdmin, async(req,res)=>{
    try {
      const allUsers = await User.find();
      if(!allUsers) return res.status(404).json({message:"No user found in database"});
      res.status(200).json({allUsers})
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });

  router.delete('/admin/:userId/delete', isAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  });
  
  
  module.exports = router;