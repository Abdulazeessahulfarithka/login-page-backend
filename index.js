import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import db from "./Config/db.js";
import { signUp } from "./controllers/register.js";
import { signIn } from "./controllers/login.js";

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:3000'];

dotenv.config();

const app = express();

// Database connection
db();

// Port
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if not defined

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
app.use(cors({
  origin: allowedOrigins
}));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Register route
app.post("/api/user", signUp); // Changed to POST
// SignIn route
app.post("/api/signin", signIn); // Changed to POST

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
