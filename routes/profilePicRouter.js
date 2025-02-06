const express = require("express");
const multer = require("multer");
const { isAuthorised } = require("../middleware/isAuth");
const { cloudinary } = require("../utils/cloudinary");
const { User } = require("../models/user");
const path = require("path");
const fs = require("fs"); 



const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "uploads");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath); // Create 'uploads' directory if it doesn't exist
      }
      cb(null, uploadPath); // Save files to `uploads` directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Timestamped filenames
    },
  });
  const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Limit file size to 10MB

  router.post(
    "/user/profilePicture", isAuthorised,
    upload.single("img"),
    async(req , res)=>{
        const userId = req.user._id;
        const imgFile = req.file;

        if(!imgFile){
            return res.status(400).json({message:"Profile pic required"});
        }

        try {

            let imgUrl = null;
                  if (imgFile) {
                    // Upload the image to Cloudinary
                    const imgUpload = await cloudinary.uploader.upload(imgFile.path, {
                      folder: "MusicPlayer/ProfilePics",
                      timeout: 120000, // Increase timeout to 2 minutes

                    });
                    imgUrl = imgUpload.secure_url; // Get the secure URL for the uploaded image
                  }

                  const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { profilePic: imgUrl },
                    { new: true } // Return the updated document
                  );

                  if (imgFile) {
                          fs.unlinkSync(imgFile.path);
                        }
            
                  if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                  }
            
                  res.status(200).json({
                    message: "Profile picture updated successfully",
                    profilePic: updatedUser.profilePic,
                  });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }

    }
  )

  module.exports = router;