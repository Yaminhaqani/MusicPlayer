const express = require("express");
const crypto = require("crypto");
const { User } = require("../models/user");
const { transporter } = require("../utils/nodemailer");

const router = express.Router();




router.post("/user/forgotPass", async (req ,res)=>{
    try {
        const {email}= req.body;
        if(!email){
            return res.status(400).json({ message: "Email is required." }); 
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res
            .status(404)
            .json({ message: "User with that email does not exist." });
        }

        const id = user._id;

        const passwordResetLink = `http://localhost:3000/user/resetPass/${id}`;


        transporter.sendMail(
            {
              from: "yaminhaqani@gmail.com",
              to: email,
              subject: "Password reset link",
              text: passwordResetLink, //most email clients prioritize the html version over text, so only the HTML content is displayed.
              html: `<h1>Password Reset</h1><p>Click the link below to reset your password:</p><a href="${passwordResetLink}">${passwordResetLink}</a>`,
            },
            (reject, resolve) => {
              if (reject) {
                console.log(reject); //for personal debugging
                return res.status(500).json({ message: "Server Error" });
              }
      
              console.log(resolve); //for personal debugging
              return res.status(200).json({
                message: "Password reset link sent to your mail Successfully",
              });
            }
          );

    } catch (error) {
        
    }
})

module.exports = router;