const express = require('express');
const { User } = require('../models/user');
const { Song } = require('../models/song');
const { isAdmin } = require('../middleware/isAdmin');


const router = express.Router();

// Endpoint for daily user sign-ups
router.get('/users/daily', isAdmin , async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },  //This converts the createdAt field (a date) into a string formatted as "YYYY-MM-DD". It groups all users by the day they signed up.
          count: { $sum: 1 }  //For each group (each day), it adds 1 for every document, effectively counting the number of user sign-ups per day.
        }
      },
      { $sort: { _id: 1 } } // Sort chronologically. This sorts the results in ascending order based on the _id field (which in this case is the date string). This ensures that the results are returned chronologically.
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint for daily song uploads
router.get('/songs/daily',isAdmin, async (req, res) => {
  try {
    const data = await Song.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
