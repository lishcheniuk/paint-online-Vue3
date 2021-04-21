interface IStyles {
  fillStyle?: string;
  lineWidth?: number;
  strokeStyle?: string;
}

export function clearHandlers(canvas: any) {
  canvas.onmousedown = null;
  canvas.onmouseup = null;
  canvas.onmousemove = null;
}

export function setStyles(canvas: any, styles: IStyles) {
  const ctx = canvas.getContext("2d");
  Object.entries(styles).forEach(([key, value]) => (ctx[key] = value));
}
