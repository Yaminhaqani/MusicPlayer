const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passComplexity = require("joi-password-complexity");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String},
  gender: { type: String, required: true },
  birthDate: { type: Date, required: true },
  likedSongs: { type: [String], default: [] },
  playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }], // Reference to Playlist
  isAdmin: { type: Boolean, default: false },
},
{timestamps: true}  // Auto-generates createdAt & updatedAt
);



// Let’s say you have a new feature in your app where you want to regenerate the token after some action (e.g., updating user profile), instead of rewriting the token generation logic everywhere, you just call generateAuthToken() from the User schema.

// javascript
// Copy code
// const user = await User.findById(userId);
// const token = user.generateAuthToken();  // Reusing the token generation logic


// If You Did It Directly in the Login Handler:
// If you generate the token directly in the login handler, you would have to do the following:
// javascript
// Copy code
// const token = jwt.sign(
//   { _id: findUser._id, name: findUser.name, isAdmin: findUser.isAdmin },
//   process.env.JWTPRIVATEKEY,
//   { expiresIn: "7d" }
// );
// This works, but it means you're duplicating that logic every time you need to generate a token (e.g., registration, password reset, etc.). It also makes the login handler a bit messier by handling more responsibilities (token generation).



userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
  return token;
};

const validate = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(10).required(),
    email: Joi.string().email().required(),
    password: passComplexity().required(),
    birthDate: Joi.date().iso().required(),
    gender: Joi.string().valid("male", "female").lowercase().required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate };
