import { IFigure, sendMessage } from "./websocket";

function brush(canvas: any, sessionId: string) {
  const ctx = canvas.getContext("2d");
  let isDown = false;

  canvas.onmousedown = mouseDownHandler;
  canvas.onmouseup = mouseUpHandler;
  canvas.onmousemove = mouseMoveHandler;

  function mouseDownHandler(e: any) {
    isDown = true;
    const startX = e.pageX - e.target.offsetLeft;
    const startY = e.pageY - e.target.offsetTop;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
  function mouseMoveHandler(e: any) {
    if (isDown) {
      const currentX = e.pageX - e.target.offsetLeft;
      const currentY = e.pageY - e.target.offsetTop;

      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      // sendMessage({
      //   method: "draw",
      //   sessionId,
      //   figure: {
      //     type: "brush",
      //     x: currentX,
      //     y: currentY,
      //     color: ctx.strokeStyle,
      //     lineWidth: ctx.lineWidth
      //   }
      // });
    }
  }
  function mouseUpHandler() {
    isDown = false;

    // sendMessage({
    //   method: "draw",
    //   sessionId,
    //   figure: {
    //     type: "finish"
    //   }
    // });
  }
}

brush.draw = (ctx: any, options: IFigure) => {
  const { x, y, color, lineWidth } = options;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x, y);
  ctx.stroke();
};

export default brush;
