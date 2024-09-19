import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import db from "./Config/db.js"
import { signUp } from "./controllers/register.js";
import { signIn } from "./controllers/login.js";


dotenv.config()

const app =express()

// Database connection
db();

//port
const PORT = process.env.PORT


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

// Start /server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});