const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// io = server / socket = usuario
io.on("connection", (socket) => {
  io.emit("chat message", "Usuário Conectado");
  console.log("a user connected");
  socket.on("disconnect", () => {
    io.emit("chat message", "Usuário Desconectado");
    console.log("a user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
