const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Feedback = require('./Feedback');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://meghana_26:Meghana%402606@ac-i99ss0w-shard-00-00.f1wqsa7.mongodb.net:27017,ac-i99ss0w-shard-00-01.f1wqsa7.mongodb.net:27017,ac-i99ss0w-shard-00-02.f1wqsa7.mongodb.net:27017/?replicaSet=atlas-kb4xep-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));


app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Handle feedback submission
app.post('/feedback', async (req, res) => {
    const { name, message } = req.body;
    console.log("📩 Feedback received:", name, message);

    try {
        const newFeedback = new Feedback({ name, message });
        await newFeedback.save();
        res.json({ msg: `✅ Thanks for your feedback, ${name}!` });
    } catch (err) {
        console.error("❌ Error saving feedback:", err);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});