require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

// Connect to MongoDB
connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/policies", require("./route/policyRoute"));
app.use("/api/customers", require("./route/customerRoute"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
