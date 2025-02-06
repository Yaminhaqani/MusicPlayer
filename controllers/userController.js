const multer = require("multer");
const { Song } = require("../models/song");
const { User, validate } = require("../models/user");
const bcrypt = require("bcryptjs");

const registerHandler = async (req, res) => {
  // try {
  //   const { name, email, password, gender, month, date, year } = req.body;

  //   if (!name || !email || !password || !gender || !month || !date || !year) {
  //     return res.status(400).json({ message: "All credentials required" });
  //   }

  //   const findUser = await User.findOne({email});

  //   if (findUser) {
  //     return res.status(400).json({ message: "User already exists" });
  //   }

  // const hashedPassword = await bcrypt.hash(password, 10);

  // const createUser = await User.create({
  //   name,
  //   email,
  //   password: hashedPassword,
  //   birthDate,
  // });

  //   if (createUser) {
  //     res.status(200).json({ message: "User registered successfully!" });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ message: "Server Error" });
  // }
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Create a new user using the validated input

    const { username, email, password, gender, birthDate } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name: username,
      email: email,
      password: hashedPassword,
      gender: gender,
      birthDate: birthDate,
    });

    if (createUser) {
      res.status(201).json({ message: "User created successfully"})
    }
  } catch (err) {
    res
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};



const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All credentials required" });
    }

    const findUser = await User.findOne({ email });
    

    if (!findUser) {
      return res
        .status(400)
        .json({ message: "User does'nt exist, please register" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (email !== findUser.email || !isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    } else {
      const token = findUser.generateAuthToken();
      return res.status(200).json({ message: "LoggedIn successfully", token: token});
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllSongs = async (req , res)=>{
  try {
    const allSongs = await Song.find();

    if(!allSongs || allSongs.length === 0){
      return res.status(404).json({ message: "No songs found" });
    }
    return res.status(200).json({songs: allSongs});
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving songs"});
    
  }

  
}

module.exports = { registerHandler, loginHandler, getAllSongs};
