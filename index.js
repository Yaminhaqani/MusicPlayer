require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/connectDb");
const {
  registerHandler,
  loginHandler,
} = require("./controllers/userController");
const { isAuthorised } = require("./middleware/isAuth");
const { isAdmin } = require("./middleware/isAdmin");
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
app.get("/user/login", loginHandler);
app.get("/protected", isAuthorised, (req, res)=>{
  res.status(200).send("This is a protected route.");
})


app.get("/admin", isAdmin, (req, res)=>{
  res.status(200).send("This is a admin route.");
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
