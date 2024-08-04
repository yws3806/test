const ws = new WebSocket("ws://localhost:9090");

// WebSocket 연결이 열렸을 때 실행
ws.onopen = () => {
  console.log("WebSocket 연결이 열렸습니다.");
};

// 메시지를 수신했을 때 실행
ws.onmessage = (event) => {
  console.log("수신된 메시지:", event.data);
  // 여기서 WebRTC 연결을 설정합니다.
};

// WebSocket 오류 발생 시 실행
ws.onerror = (error) => {
  console.error("WebSocket 오류:", error);
};

// WebSocket 연결이 닫혔을 때 실행
ws.onclose = () => {
  console.log("WebSocket 연결이 닫혔습니다.");
};

// 신호를 전송하는 함수
function sendSignal(signal) {
  if (ws.readyState === WebSocket.OPEN) {
    // 연결 상태 확인
    ws.send(JSON.stringify(signal));
  } else {
    console.error("WebSocket이 열려 있지 않습니다. 신호를 전송할 수 없습니다.");
  }
}
