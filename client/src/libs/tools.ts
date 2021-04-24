export function clearHandlersCanvas(canvas: any) {
  canvas.onmousedown = null;
  canvas.onmouseup = null;
  canvas.onmousemove = null;
}

// export function setStylesCanvas(canvas: any, styles: IStyles) {
//   const ctx = canvas.getContext("2d");
//   Object.entries(styles).forEach(([key, value]) => (ctx[key] = value));
// }
