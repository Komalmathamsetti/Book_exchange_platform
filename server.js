const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const pool = require("./db");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const exchangeRoutes = require("./routes/exchangeRoutes");
const dashBoardRoutes = require("./routes/dashBoardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin : "*"
    }
});
let users = {};
io.on("connection",(socket)=>{
    console.log("User connected:",socket.id);
    socket.on("register",(user_id)=>{
        users[user_id] = socket.id;
        console.log("User regstered:",user_id);
    });
    socket.on("disconnect",()=>{
        console.log("User disconnected")
    });
});
app.set("io",io);
app.set("users",users);
app.use("/auth",authRoutes);
app.use("/books",bookRoutes);
app.use("/exchange",exchangeRoutes);
app.use("/dashBoard",dashBoardRoutes);
app.use("/notifications",notificationRoutes);
app.get("/",(req,res)=>{
    res.send("Backend server is running");
});
app.get("/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});
const PORT = 5000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});