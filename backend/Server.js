const cors = require("cors");

require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const UserModel = require('./models/Users');
const bcrypt = require('bcrypt');
const routes = require('./routes/EComroute');
const jwt = require("jsonwebtoken");
const Razorpay = require('razorpay');



const app = express();
app.use(express.json());
// 

app.use(cors({
    origin: "https://e-commerse-frontend-bice.vercel.app", // Replace <your-origin-here> with your allowed origin(s)
    methods: ["POST", "GET"],
    credentials: true
  }));


// mongoose.connect('mongodb://localhost:27017/ECommerce');
mongoose.connect('mongodb+srv://jammudurgaprasad:jammudurgaprasad@cluster0.gl93u.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0')
app.use(routes)


app.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create new user
        const user = await UserModel.create({ name, email, password });
        res.status(201).json({ message: "User registered successfully", userId: user._id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating user" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, "yourSecretKey", { expiresIn: "1h" });

        res.status(200).json({ 
            message: "Login successful", 
            userId: user._id, 
            token  // Send token for authentication
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});



// app.listen(3002,()=>{
//     console.log("Server is running")
// })

// Use environment port

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});