require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", require("./routes/auth"));
app.use("/api/franchisee", require("./routes/franchisee"));
app.use("/api/shopkeeper", require("./routes/shopkeeper"));
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});