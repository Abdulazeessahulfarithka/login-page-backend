import registerModel from "../model/registerModel.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, phoneno } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phoneno) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    

    // Save the new user with the hashed password
    const newUser = new registerModel({
      name,
      email,
      password: passwordHash,  // Store hashed password
      phoneno,
    });

    await newUser.save();

    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.error("Error during sign up:", err);
    res.status(500).json({ error: err.message });
  }
};
