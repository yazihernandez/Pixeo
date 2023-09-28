import bcrypt from "bcrypt";  // password encryption
import jwt from "jsonwebtoken"; // Give user webtoken for authorization
import User from "../models/User.js"; // "Model" file contains all scheme parameters (data types)

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      Name,
      email,
      password,
      picturePath,
      friends,
      bio,
    } = req.body;

    const salt = await bcrypt.genSalt();  // random salt for password encryption
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      Name,
      email,
      password: passwordHash,
      picturePath,
      friends,
      bio,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("User saved");
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Registration unsuccessful");
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;                     // remove passsword from token so frontend doesn't see it
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error");
  }
};
