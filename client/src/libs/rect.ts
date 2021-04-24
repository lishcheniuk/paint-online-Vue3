import { IFigure, sendMessage } from "./websocket";

function rect(canvas: any, sessionId: string) {
  const ctx = canvas.getContext("2d");
  let isDown = false;
  let startX: number;
  let startY: number;
  let width: number;
  let height: number;
  let imageUrl: string;

  canvas.onmousedown = mouseDownHandler;
  canvas.onmouseup = mouseUpHandler;
  canvas.onmousemove = mouseMoveHandler;

  function mouseDownHandler(e: any) {
    isDown = true;
    startX = e.pageX - e.target.offsetLeft;
    startY = e.pageY - e.target.offsetTop;

    ctx.beginPath();
    imageUrl = canvas.toDataURL();
  }

  function mouseMoveHandler(e: any) {
    if (isDown) {
      const currentX = e.pageX - e.target.offsetLeft;
      const currentY = e.pageY - e.target.offsetTop;

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        width = currentX - startX;
        height = currentY - startY;

        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.fill();
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
        type: "rect",
        startX,
        startY,
        width,
        height,
        color: ctx.fillStyle
      }
    });
  }
}

rect.draw = (ctx: any, options: IFigure) => {
  const { startX, startY, width, height, color } = options;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.rect(startX, startY, width, height);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
};

export default rect;
