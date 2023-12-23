import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      socialProfiles,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      socialProfiles,
      viewedProfile: 0,//Math.floor(Math.random() * 10000),
      impressions: 0,//Math.floor(Math.random() * 10000),
    });

     // Manually increment viewedProfile and impressions for a new user
     newUser.viewedProfile += 1;
     newUser.impressions += 1;


     login.viewedProfile += 1;
     login.impressions += 1;
     
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email,  username: username});
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};