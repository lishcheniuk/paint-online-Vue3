const WebSocketServer = require("ws");
const http = require("http");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer();
const wss = new WebSocketServer.Server({ port: 3001 });

wss.on("connection", function (ws) {
  ws.id = uuidv4();
  console.log("connection");
});
