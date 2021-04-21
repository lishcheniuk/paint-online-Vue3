export function line(canvas: any) {
  const ctx = canvas.getContext("2d");
  let isDown = false;
  let savedUrl: string;
  let startX: number;
  let startY: number;

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
      const currentX = e.pageX - e.target.offsetLeft;
      const currentY = e.pageY - e.target.offsetTop;

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
  }
}
