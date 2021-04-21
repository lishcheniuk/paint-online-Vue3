export function rect(canvas: any) {
  const ctx = canvas.getContext("2d");
  let isDown = false;
  let startX: number;
  let startY: number;
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

        ctx.beginPath();
        ctx.rect(startX, startY, currentX - startX, currentY - startY);
        ctx.fill();
        ctx.stroke();
      };
    }
  }
  function mouseUpHandler() {
    isDown = false;
  }
}
