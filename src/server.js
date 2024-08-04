const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "dist")));

/** 메인 라우터 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

// 클라이언트 연결 시
io.on("connect", (socket) => {
  console.log("a user connected");

  socket.on("client", (data) => {
    console.log(data);
  });
  socket.emit("server", "서버입니다");

  socket.on("join", (key) => {
    socket.join(key);
    socket.to(key).emit("welcome", `welcome ${key}를 통해 연결 하였습니다.`);
  });

  socket.on("chat", (chat, key) => {
    socket.to(key).emit("chat", chat);
  });

  socket.on("liveChat", (liveChat, key) => {
    socket.to(key).emit("liveChat", liveChat);
  });
});

io.listen(9091);

// 서버 시작
const PORT = process.env.PORT || 9090;
server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
