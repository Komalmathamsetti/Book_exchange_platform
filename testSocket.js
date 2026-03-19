const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);

  // register user
  socket.emit("register", 1);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected");
});

socket.on("new_notification", (data) => {
  console.log("🔔 Notification:", data);
});