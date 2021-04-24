function circle(canvas: any, sessionId: string) {
  const ctx = canvas.getContext("2d");
  let isDown = false;
  let canvasUrl: string;
  let startX: number;
  let startY: number;

  canvas.onmousedown = mouseDownHandler;
  canvas.onmouseup = mouseUpHandler;
  canvas.onmousemove = mouseMoveHandler;

  function mouseDownHandler(e: any) {
    isDown = true;
    startX = e.pageX - e.target.offsetLeft;
    startY = e.pageY - e.target.offsetTop;

    canvasUrl = canvas.toDataURL();
    ctx.beginPath();
  }

  function mouseMoveHandler(e: any) {
    if (isDown) {
      const currentX = e.pageX - e.target.offsetLeft;
      const currentY = e.pageY - e.target.offsetTop;

      let width = currentX - startX;
      let height = currentY - startY;
      let r = Math.sqrt(width ** 2 + height ** 2);

      const img = new Image();
      img.src = canvasUrl;
      img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(startX, startY, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      };
    }
  }

  function mouseUpHandler() {
    isDown = false;
  }
}

circle.draw = () => {};

export default circle;
