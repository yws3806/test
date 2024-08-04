const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

// 클라이언트 연결 시
wss.on("connection", (ws) => {
  console.log("새로운 클라이언트 연결");

  // 클라이언트를 배열에 추가
  clients.push(ws);

  // 메시지 수신 시
  ws.on("message", (message) => {
    console.log("수신된 메시지:", message);

    // 모든 클라이언트에게 메시지 전송
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // 클라이언트 연결 해제 시
  ws.on("close", () => {
    console.log("클라이언트 연결 해제");
    clients = clients.filter((client) => client !== ws);
  });
});

// 정적 파일 제공
app.use(express.static("dist"));

// 서버 시작
const PORT = process.env.PORT || 9090;
server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
