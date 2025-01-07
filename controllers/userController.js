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
  //   gender,
  //   month,
  //   date,
  //   year,
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
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Create a new user using the validated input

    const { name, email, password, gender, month, date, year } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      gender: gender,
      month: month,
      date: date,
      year: year,
    });

    if (createUser) {
      res
        .status(201)
        .send({ message: "User created successfully", user: createUser });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error creating user", error: err.message });
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

module.exports = { registerHandler, loginHandler };
