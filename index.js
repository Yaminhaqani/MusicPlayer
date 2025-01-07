require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/connectDb");
const { registerHandler, loginHandler } = require("./controllers/userController");
const app = express();

connectDb();

//middlewares
app.use(express.json());


app.get("/", (req,res)=>{res.json({message: "Hello from the server"})})

app.post("/user/register", registerHandler)
app.get("/user/login", loginHandler)

const port = process.env.PORT || 8080;
app.listen(port, ()=>{console.log(`Server listening on port ${port}...`);
})