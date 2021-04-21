export function brush(canvas: any) {
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
    }
  }
  function mouseUpHandler() {
    isDown = false;
  }
}
