import registerModel from "../model/registerModel.js";
import argon2 from "argon2";

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

    // Hash the password with argon2
    const passwordHash = await argon2.hash(password);
    
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

export const getAll= async (req, res) => {
  try {
    const user = await registerModel.find({});
    res.status(200).send({
      success: true,
      message: "All  retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error retrieving register:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving register",
      error,
    });
  }
};