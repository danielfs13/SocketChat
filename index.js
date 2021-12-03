const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let usersOnline = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// io = server / socket = usuario
io.on("connection", (socket) => {
  usersOnline++;
  console.log(socket.id);
  io.emit("chat message", "Usuário Conectado, online: " + usersOnline);
  console.log("a user connected");

  socket.on("disconnect", () => {
    usersOnline--;
    io.emit("chat message", "Usuário Desconectado online: " + usersOnline);
    console.log("a user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });

  socket.on("user typing", () => {
    socket.broadcast.emit("user typing");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
