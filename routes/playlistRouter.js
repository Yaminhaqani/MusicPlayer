const express = require("express");
const multer = require("multer");
const fs = require("fs"); // For file system operations
const path = require("path"); // For handling file paths
const { cloudinary } = require("../utils/cloudinary"); // Import Cloudinary utility
const { Playlist } = require("../models/playlist"); // Import Playlist model
const { isAuthorised } = require("../middleware/isAuth");
const { Song } = require("../models/song");
const { User } = require("../models/user");



const router = express.Router();

// Setting up Multer Storage Configuration
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

const upload = multer({ storage }); // Initialize Multer with the configured storage

// Create Playlist Route
router.post(
  "/user/createPlaylist",isAuthorised,
  upload.single("img"), // Single file upload for playlist image
async (req, res) => {

    const { name, desc } = req.body; // Extract playlist name and description
    const userId = req.user._id; // Extract user ID from the authenticated user
    const imgFile = req.file; // Uploaded image file
    

    if (!name) {
      return res.status(400).send("Playlist name is required.");
    }

    try {
      
      // Check if a playlist with the same name already exists for this user
      const existingPlaylist = await Playlist.findOne({ name, user: userId });
      if (existingPlaylist) {
        if (imgFile) {
          fs.unlinkSync(imgFile.path); // Clean up the uploaded image
        }
        return res
          .status(400)
          .send({ message: "Playlist with this name already exists." });
      }

      let imgUrl = null;
      if (imgFile) {
        // Upload the image to Cloudinary
        const imgUpload = await cloudinary.uploader.upload(imgFile.path, {
          folder: "MusicPlayer/playlists",
        });
        imgUrl = imgUpload.secure_url; e
      }

      // Create a new playlist in the database
      const newPlaylist = await Playlist.create({
        name,
        user: userId, // Link the playlist to the authenticated user
        desc:desc || "",
        img: imgUrl,
        songs: [], 
      });

      const user = await User.findById(userId);
user.playlist.push(newPlaylist._id);
await user.save();

      // Clean up the local file after processing
      if (imgFile) {
        fs.unlinkSync(imgFile.path);
      }

      res.status(201).send({
        message: "Playlist created successfully!",
        playlist: newPlaylist,
      });
    } catch (error) {
      console.error("Error creating playlist:", error);
      res.status(500).send("Error creating playlist.");
    }
  }
);






// Add Song to Playlist Route
router.post(
  "/:playlistId/add-song",
  isAuthorised,
  async (req, res) => {
    try {
      const { songId } = req.body;
      const playlistId = req.params.playlistId;

      // Find the playlist and check if the user is the owner
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).send("Playlist not found");
      }

      if (playlist.user.toString() !== req.user._id.toString()) {
        return res.status(403).send("You are not the owner of this playlist");
      }

      const song = await Song.findById(songId);
      if (!song) return res.status(404).send("Song not found");

      if (playlist.songs.includes(songId)) {
        return res.status(400).send("Song already in playlist");
      }

      playlist.songs.push(songId);
      await playlist.save();

      res.status(200).json({
        message: "Song added to playlist",
        playlist: await Playlist.findById(playlist._id).populate('songs')
      });
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      res.status(500).send("Server error");
    }
  }
);


//DELETE SONG FROM PLAYLIST
router.delete("/:playlistId/remove-song",
  isAuthorised,
  async(req , res)=>{
    try {
      
      const {songId} = req.body;
      const playlistId = req.params.playlistId;

      const playlist = await Playlist.findById(playlistId);

      if(!playlist){
        return res.status(404).send("Playlist not found");
      }

      if(playlist.user.toString()!==req.user._id.toString()){
        return res.status(403).send("You are not the owner of this playlist");
      }

      if(!playlist.songs.includes(songId)){
        return res.status(400).send("Song not in playlist");
      }

      //remove song
      playlist.songs = playlist.songs.filter(
        (id)=> id.toString()!==songId
      );
      await playlist.save();

      res.status(200).json({
        message: "Song removed from playlist",
        playlist: await Playlist.findById(playlist._id).populate('songs')
      });

    } catch (error) {
      console.error("Error removing song:", error);
      res.status(500).send("Internal Server Error");
    }
  }
)







router.get("/user/playlists", isAuthorised, async (req, res) => {
  try {
    console.log("Authenticated User:", req.user); // Debugging line
    const userId = req.user._id;
    const playlists = await Playlist.find({ user: userId }).populate("songs");
    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ message: "Failed to fetch playlists" });
  }
});




// Get a single playlist by ID (with populated songs)
router.get("/playlist/:playlistId", isAuthorised, async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId).populate("songs");
    if (!playlist) {
      return res.status(404).send({ message: "Playlist not found" });
    }
    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).send({ message: "Server error" });
  }
});



module.exports = router;
