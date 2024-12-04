const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());
// Middleware
app.use(cors());
//app.use(bodyParser.json());


// Connect to MongoDB (replace the URL with your MongoDB URI)
mongoose.connect("mongodb://localhost:27017/mern_signup", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  //.catch((error) => console.log(error));
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Route to handle user signup
app.post("/api/signup", async (req, res) => {
//app.post("/api/signup", (req, res) => {
console.log("Received Request:", req.body);
res.status(200).json({ message: "Signup successful" }); // Send a response

  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
       return res.status(400).json({ message: "All fields are required" });
      }
      const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password

        // Save user to the database (mock code)
        console.log('Received Request:', { username, email, password: hashedPassword });
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    //const existingUser = User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    //const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    //newUser.save();
    res.status(201).json({ message: "User Registered / Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error. Please Try Again Later" });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  try {
    console.log('Received Request:', req.body);

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (err) {
      res.status(500).json(err);
    } else if (!success) {
      res.status(404).json(); 
    }
    res.status(200).json(success);

    // Sign JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';  // Replace with environment variable in production
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

    return res.json({ token });

  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Server error during login' });
  }
});


// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
