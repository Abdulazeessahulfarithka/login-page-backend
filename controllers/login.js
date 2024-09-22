import registerModel from "../model/registerModel.js";
import argon2 from "argon2";
import JWT from "jsonwebtoken";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body; // Remove `name` from the body

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    // Find the user by email (use findOne to get a single document)
    const user = await registerModel.findOne({ email: req.body.email });
    
if (!user) {
  return res.status(404).send("User not found");
}

    // Verify the password with argon2
    const isMatch = await argon2.verify(user.password, password);
    console.log("Password match result:", isMatch);  // Log password comparison

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // 7-day expiration for the token
    });

    // Respond with token and user info (exclude sensitive data like password)
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: { _id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).send({ message: "Error signing in" });
  }
};

