import { IFigure, sendMessage } from "./websocket";

function line(canvas: any, sessionId: string) {
  const ctx = canvas.getContext("2d");
  let isDown = false;
  let savedUrl: string;
  let startX: number;
  let startY: number;
  let currentX: number;
  let currentY: number;

  canvas.onmousedown = mouseDownHandler;
  canvas.onmouseup = mouseUpHandler;
  canvas.onmousemove = mouseMoveHandler;

  function mouseDownHandler(e: any) {
    isDown = true;
    startX = e.pageX - e.target.offsetLeft;
    startY = e.pageY - e.target.offsetTop;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    savedUrl = canvas.toDataURL();
  }
  function mouseMoveHandler(e: any) {
    if (isDown) {
      currentX = e.pageX - e.target.offsetLeft;
      currentY = e.pageY - e.target.offsetTop;

      const img = new Image();
      img.src = savedUrl;
      img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
      };
    }
  }
  function mouseUpHandler() {
    isDown = false;

    sendMessage({
      method: "draw",
      sessionId,
      figure: {
        type: "line",
        startX,
        startY,
        endX: currentX,
        endY: currentY,
        color: ctx.strokeStyle,
        lineWidth: ctx.lineWidth
      }
    });
  }
}

line.draw = (ctx: any, options: IFigure) => {
  const { startX, startY, endX, endY, color, lineWidth } = options;

  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.beginPath();
};

export default line;
