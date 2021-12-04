const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var usuarios = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// io = server / socket = usuario
io.on("connection", (socket) => {
  socket.on("new user", function (data, callback) {
    const user = usuarios.find((x) => x.nickname === data);
    if (user) {
      callback(false);
    } else {
      callback(true);
      const userData = {
        id: socket.id,
        nickname: data,
      };
      usuarios.push(userData);
      console.log(usuarios);
      io.emit(
        "chat message",
        data + " acabou de entrar, online: " + usuarios.length
      );
      io.emit("user list", userData.nickname);
    }
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("user typing", () => {
    socket.broadcast.emit("user typing");
  });

  socket.on("user list", (userData) => {
    io.emit("user list", userData.nickname);
  });

  socket.on("disconnect", () => {
    const user = usuarios.find((x) => x.id === socket.id);
    console.log(user);
    usuarios.splice(usuarios.indexOf(user), 1);
    console.log(usuarios);
    io.emit("userlist disc", usuarios);
    if (user && user.nickname) {
      io.emit(
        "chat message",
        user.nickname + " desconectado, online: " + usuarios.length
      );
    }
  });
});

server.listen(3000, () => {
  console.log("Servidor iniciado.");
});
