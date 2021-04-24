const WebSocketServer = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocketServer.Server({ server });

wss.on("connection", function (ws) {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);

    switch (msg.method) {
      case "connection":
        ws.id = msg.sessionId;
        ws.username = msg.username;
        broadcastConnection(msg);
        break;
      case "draw":
        broadcastConnection(msg);
        break;
    }
  });

  ws.on("close", function () {
    broadcastConnection({
      sessionId: ws.id,
      method: "exit",
      message: `Пользователь ${ws.username} вышел`
    });
  });
});

function broadcastConnection(msg) {
  wss.clients.forEach((client) => {
    if (client.id === msg.sessionId) {
      client.send(JSON.stringify(msg));
    }
  });
}

server.listen(process.env.PORT || 8000);
