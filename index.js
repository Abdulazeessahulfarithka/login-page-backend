import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import db from "./Config/db.js"
import { signUp } from "./controllers/register.js";
import { signIn } from "./controllers/login.js";
const allowedOrigins = ['http://localhost:3000',];



dotenv.config()

const app =express()

// Database connection
db();

//port
const PORT = process.env.PORT

// CORS configuration
app.use(cors({
  origin: allowedOrigins
}));

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

//routes
app.use("/api/user",signUp)
app.use("/api/signin",signIn)
app.use(cors({

}))
// Start /server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});