const cors = require("cors");

require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const predictionRoutes = require("./routes/prediction.routes");
const weatherRoutes = require("./routes/weather.routes");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
    res.send("AgriPredict API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`AgriPredict server running on port ${PORT}`);
});