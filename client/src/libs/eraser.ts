function eraser(canvas: any, sessionId: string) {
  const ctx = canvas.getContext("2d");
  let isDown = false;
  const currentStrokeStyle = ctx.strokeStyle;

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
      ctx.strokeStyle = "white";
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    }
  }

  function mouseUpHandler() {
    isDown = false;
    ctx.strokeStyle = currentStrokeStyle;
  }
}

eraser.draw = () => {};

export default eraser;
