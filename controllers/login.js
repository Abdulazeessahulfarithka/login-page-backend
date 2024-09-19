import registerModel from "../model/registerModel.js";
import argon2 from "argon2";
import JWT from "jsonwebtoken";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await registerModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials." });

    // Compare the password with argon2
    const isMatch = await argon2.verify(user.password, password);
    console.log("Password match result:", isMatch);  // Log comparison result

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // Generate JWT token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user details (without password)
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error("Error during signIn:", err);
    res.status(500).json({ error: err.message });
  }
};
