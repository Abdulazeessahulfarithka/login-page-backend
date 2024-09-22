import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import db from "./Config/db.js"
import registerRoute from "./routes/registerRoute.js"
import loginRoute from "./routes/loginRoute.js"
const allowedOrigins = ['http://localhost:3000', 'https://magnificent-maamoul-1ebb5a.netlify.app/'];



dotenv.config()
// Database connection
db();

const app =express()



//port
const PORT = process.env.PORT

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
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