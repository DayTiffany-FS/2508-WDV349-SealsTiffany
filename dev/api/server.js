const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// connect to mongodb

mongoose
    .connect("mongodb://127.0.0.1:27017/offramp")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const gigSchema = new mongoose.Schema({
    date: String,
    time: String,
    venue: String,
    city: String
});

const Gig = mongoose.model("Gig", gigSchema);

// server front end

app.use(express.static(path.join(__dirname, "../portfolio")));

app.get("/", (req, resx) => {
    res.sendFile(path.join(__dirname, "../portfolio/index.html"));
});

// get all gigs

app.get("/gigs", async (req, res) => {
    try {
        const gigs = await Gig.find();
        res.json(gigs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get gig by id

app.get("/gigs/:id", async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        gig ? res.json(gig) : res.status(404).json({ message: "Gig not found" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// post new gig

app.post("/gigs", async (req, res) => {
    try {
        const newGig = new Gig(req.body);
        await newGig.save();
        res.status(201).json(newGig);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// patch edit gig

app.patch("/gigs/:id", async (req, res) => {
    try {
        const updatedGig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true });
        updatedGig ? res.json(updatedGig) : res.status(404).json({ message: "Gig not found" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete gig

app.delete("/gigs/:id", async (req, res) => {
    try {
        await Gig.findByIdAndDelete(req.params.id);
        res.json({ message: "Gig deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));