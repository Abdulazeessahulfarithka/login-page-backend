import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import db from "./Config/db.js"
import registerRoute from "./routes/registerRoute.js"
import loginRoute from "./routes/loginRoute.js"
const allowedOrigins = ['http://localhost:3000',];



dotenv.config()
// Database connection
db();

const app =express()



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
app.use("/api/user",registerRoute)
app.use("/api/signin",loginRoute)
app.use(cors({

}))
// Start /server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});