require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/connectDb");
const {
  registerHandler,
  loginHandler,
  getAllSongs,
} = require("./controllers/userController");
const { isAuthorised } = require("./middleware/isAuth");
const { isAdmin } = require("./middleware/isAdmin");
const songRouter = require('./routes/songRouter');
const playlistRouter = require('./routes/playlistRouter');
const profilePicRouter = require('./routes/profilePicRouter');
const userDetailsRouter = require('./routes/userDetailsRouter');
const changePassRouter = require('./routes/changePassRouter');
const forgotPassRouter = require('./routes/forgotPassRouter');
const resetPassRouter = require('./routes/resetPassRouter');
const analyticsRoutes = require('./routes/analyticsRoutes');
const totalCountRouter = require('./routes/totalCountRouter');



const app = express();

connectDb();

//middlewares
app.use(express.json());
app.use(cors());



//ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

app.post("/user/register", registerHandler);
app.post("/user/login", loginHandler);
app.get("/protected", isAuthorised, (req, res)=>{
  res.status(200).send("This is a protected route.");
})


app.post("/admin", isAdmin, (req, res)=>{
  res.status(200).send("This is a admin route.");
});

app.post("/user/verify", isAuthorised, (req, res) => {
  res.status(200).json({ message: "Token is valid." });
});

// Use the song upload route
app.use(songRouter);
app.use(playlistRouter);

app.use(profilePicRouter);
app.use(userDetailsRouter);
app.use(changePassRouter);
app.use(forgotPassRouter);
app.use(resetPassRouter);
app.use(totalCountRouter);
app.use('/api/analytics', analyticsRoutes);

app.get("/allSongs", getAllSongs);

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
