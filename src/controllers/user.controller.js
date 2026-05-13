import { json } from "express";
import User from "../models/user.model.js"

const registerUser = async (req, res) => {
try {
  const { username, password, email } = req.body;

  //basic validation
  if(!username || !password || !email) {
    return res.status(400).json({
      message: "All fields are important"
    })
  }

  //checks if user exists already
  const existingUser = await User.findOne({
    email: email.toLowerCase()
  })
  if (existingUser){
    return res.status(400).json({
      message: "User exists already"
    })
  }

  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password,
    loggedIn: false,
  })

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id, //gotten from mongoDB
      email: user.email, //gotten from input
      username: user.username, //gotten from inputed fields
    }
  })

} catch (error) {
  res.status(500).json({
    message: "Internal server error",
    error: error.message
  })
}
}

export {registerUser};