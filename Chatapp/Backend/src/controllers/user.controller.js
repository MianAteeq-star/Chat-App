import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { fullname, username, email, password, confirmPassword, gender } =
      req.body;
    if (!fullname || !username || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password did not match" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //for hashing password

    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // new User creation
    const newUser = await new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePhoto: gender === "male" ? maleAvatar : femaleAvatar,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in REgistartion controller",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = await jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: {
          _id: user._id,
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          profilePhoto: user.profilePhoto,
          gender: user.gender,
        },
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Login controller",
      error,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Logout controller",
      error,
    });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    console.log(loggedInUser);
    const user = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    return res.status(200).json({
      success: true,
      message: "Other users fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getOtherUsers controller",
      error,
    });
  }
};
