import express from "express";
import http from "http";
import path from "path";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));

/** 메인 라우터 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
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

io.listen(3001);

server.listen(3001, () => {
  console.log("listening on *:3001");
});
