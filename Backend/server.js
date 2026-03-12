const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth",authRoutes);
app.get("/",(req,res)=>{
    res.send("Backend server is running");
});
app.get("/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});