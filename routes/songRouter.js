const express = require('express');
const multer = require("multer");
const { Song } = require("../models/song");
const { cloudinary } = require('../utils/cloudinary');
const router = express.Router();
const fs = require('fs');  // For deleting local files after upload
const path = require('path'); // For handling file paths



const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


//Setting Up Multer Storage Configuration:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Save files to `uploads` directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamped filename
  },
});

//   Date.now(): We generate a unique filename using the current timestamp, which ensures no two files have the same name.
// path.extname(file.originalname): This gets the file extension of the uploaded file (e.g., .jpg, .mp3) from the original filename and appends it to the new file name.
  
const upload = multer({ storage });

//multer({ storage }): This initializes Multer with the storage configuration that defines where the uploaded files will be saved temporarily. In this case, files will be saved to the uploads/ folder with unique filenames.

// Route for uploading song and image
router.post('/admin/UploadSong', upload.fields([
    { name: 'img', maxCount: 1 },    // Image upload field
    { name: 'song', maxCount: 1 }    // Song file upload field
  ]), async (req, res) => {

    const { title, artist, genre } = req.body;

  
    const imgFile = req.files.img ? req.files.img[0] : null;  
    // checks if a file was uploaded under the img field. If so, it gets the first (and only) file from the array (req.files.img[0]), otherwise it returns null.
    const songFile = req.files.song ? req.files.song[0] : null;
  
    if (!imgFile || !songFile) {
      return res.status(400).send('Both image and song files are required.');
    }
  
    try {

      const existingSong = await Song.findOne({ title, artist });
      if (existingSong) {
        fs.unlinkSync(path.join(__dirname, 'uploads', imgFile.filename));
        fs.unlinkSync(path.join(__dirname, 'uploads', songFile.filename));
        return res.status(400).send({ message: 'Song already exists in the database.' });
      }


      // Upload image to Cloudinary
      const imgUpload = await cloudinary.uploader.upload(imgFile.path, {
        folder: 'MusicPlayer/images',
      });
  
      // Upload song to Cloudinary (set resource type to 'auto' for audio)
      const songUpload = await cloudinary.uploader.upload(songFile.path, {
        resource_type: 'auto', // For audio files
        folder: 'MusicPlayer/songs',
      });


      // Extract duration from Cloudinary's song upload metadata
    const duration = songUpload.duration;  // Duration is available in the response metadata
    
  
      // Create a new song document in MongoDB
      const newSong = await Song.create({
        title,
        artist,
        song: songUpload.secure_url,
        img: imgUpload.secure_url,
        genre,
        duration:duration,
        
      });
     
      
      
  
      // Delete the local uploaded files after processing
      fs.unlinkSync(path.join(__dirname, 'uploads', imgFile.filename));
      fs.unlinkSync(path.join(__dirname, 'uploads', songFile.filename));
  
      res.status(201).send({ message: 'Song uploaded successfully!', song: newSong });
  
    } catch (error) {
      console.error('Error uploading song:', error);
      res.status(500).send('Error uploading song.');
    }
  });
  
  module.exports = router;