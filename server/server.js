import express from "express";
import path from "path";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
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
io.on("connection", (socket) => {
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

  socket.on("chatting", (data) => {
    const message = `${data.name} : ${data.msg}`;
    io.to(data.key).emit("chat", message);
  });
});

httpServer.listen(3001, () => {
  console.log("listening on *:3001");
});
