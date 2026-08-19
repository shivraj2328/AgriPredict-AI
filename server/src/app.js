require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("AgriPredict API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`AgriPredict server running on port ${PORT}`);
});