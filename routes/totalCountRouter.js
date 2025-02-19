const express = require('express');
const { isAdmin } = require('../middleware/isAdmin');
const { User } = require('../models/user');
const { Song } = require('../models/song');

const router = express.Router();

router.get('/admin/total-users', isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    return res.status(200).json({ totalUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/admin/total-songs', isAdmin, async(req,res)=>{
   try {
    const totalSongs = await Song.countDocuments();
    return res.status(200).json({totalSongs});
   } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
   }
})

module.exports = router;
