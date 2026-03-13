// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// MongoDB Connection
// ----------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ----------------------
// Schemas & Models
// ----------------------
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const gigSchema = new mongoose.Schema({
  date: String,
  time: String,
  venue: String,
  city: String,
});

const User = mongoose.model("User", userSchema);
const Gig = mongoose.model("Gig", gigSchema);

// ----------------------
// JWT Config
// ----------------------
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ----------------------
// Nodemailer setup
// ----------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ----------------------
// Auth Routes
// ----------------------
app.post("/auth/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "8h" });

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------------
// Gigs Routes
// ----------------------
app.get("/gigs", async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/gigs/:id", async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    gig
      ? res.json(gig)
      : res.status(404).json({ message: "Gig not found" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/gigs", authenticateToken, async (req, res) => {
  try {
    const newGig = new Gig(req.body);
    await newGig.save();

    res.status(201).json(newGig);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch("/gigs/:id", authenticateToken, async (req, res) => {
  try {
    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    updatedGig
      ? res.json(updatedGig)
      : res.status(404).json({ message: "Gig not found" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/gigs/:id", authenticateToken, async (req, res) => {
  try {
    await Gig.findByIdAndDelete(req.params.id);
    res.json({ message: "Gig deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------------
// Bookings Route
// ----------------------
app.post("/api/bookings", async (req, res) => {
  const { name, email, eventDate, eventTime, message } = req.body;

  try {

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New booking from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Date: ${eventDate}
Time: ${eventTime}

Message:
${message}
      `,
    });

    res.json({ message: "Email sent successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email" });
  }
});

// Optional GET test
app.get("/api/bookings", (req, res) => {
  res.send("Bookings API is live");
});

// ----------------------
// Serve frontend
// ----------------------
app.use(express.static(path.join(__dirname, "../portfolio")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../portfolio/index.html"));
});

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});