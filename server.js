const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

// 서버 코드
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// 클라이언트 코드
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  messages.appendChild(li);
});
