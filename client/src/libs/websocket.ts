export interface IMessageSocket {
  sessionId: string;
  method: string;
  username?: string;
  figure?: IFigure;
  message?: string;
}

export interface IFigure {
  [key: string]: number | string;
}

const SOCKET_URL = process.env.VUE_APP_WS_URL;

const socket = new WebSocket(SOCKET_URL);

export function sendMessage(message: IMessageSocket) {
  socket.send(JSON.stringify(message));
}

export function subscribeMessage(callback: (msg: IMessageSocket) => void) {
  socket.addEventListener("message", (event: MessageEvent) => {
    const msg = JSON.parse(event.data);
    callback(msg);
  });
}
