const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/offramp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

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

const JWT_SECRET = "offrampsecret";

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

app.use(express.static(path.join(__dirname, "../portfolio")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../portfolio/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));