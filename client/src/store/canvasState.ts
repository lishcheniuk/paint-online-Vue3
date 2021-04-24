interface IStyles {
  fillStyle?: string;
  lineWidth?: number;
  strokeStyle?: string;
}

type CanvasStateType = typeof state;
const state = {
  _canvas: null as any,
  _username: "",
  _sessionId: "",
  _undoList: [] as Array<string>,
  _redoList: [] as Array<string>,
  _styles: {} as IStyles,
  _selectedTool: ""
};

export default {
  namespaced: true,
  state,

  getters: {
    getCanvas: (state: CanvasStateType) => state._canvas,
    canvasStyles: (state: CanvasStateType) => state._styles,
    selectedTool: (state: CanvasStateType) => state._selectedTool,
    username: (state: CanvasStateType) => state._username,
    sessionId: (state: CanvasStateType) => state._sessionId,
    undoList: (state: CanvasStateType) => state._undoList,
    redoList: (state: CanvasStateType) => state._redoList
  },

  mutations: {
    setCanvas(state: CanvasStateType, canvas: any) {
      state._canvas = canvas;
    },
    setUsername(state: CanvasStateType, username: string) {
      state._username = username;
    },
    setStyles(state: CanvasStateType, styles: IStyles) {
      const ctx = state._canvas.getContext("2d");
      const cStyles = { ...state._styles, ...styles };

      Object.entries(cStyles).forEach(([key, value]) => (ctx[key] = value));
      state._styles = cStyles;
    },
    setSelectedTool(state: CanvasStateType, tool: string) {
      state._selectedTool = tool;
    },
    setSessionId(state: CanvasStateType, id: string) {
      state._sessionId = id;
    },
    pushToUndo(state: CanvasStateType, data: string) {
      state._undoList.push(data);
    },
    undo(state: CanvasStateType) {
      const ctx = state._canvas.getContext("2d");

      if (state._undoList.length > 0) {
        const dataUrl = state._undoList.pop();
        state._redoList.push(state._canvas.toDataURL());

        const img = new Image();
        img.src = dataUrl as string;
        img.onload = () => {
          ctx.clearRect(0, 0, state._canvas.width, state._canvas.height);
          ctx.drawImage(img, 0, 0, state._canvas.width, state._canvas.height);
        };
      } else {
        ctx.clearRect(0, 0, state._canvas.width, state._canvas.heigth);
      }
    },
    redo(state: CanvasStateType) {
      const ctx = state._canvas.getContext("2d");

      if (state._redoList.length > 0) {
        const dataUrl = state._redoList.pop();
        state._undoList.push(state._canvas.toDataURL());
        const img = new Image();
        img.src = dataUrl as string;
        img.onload = () => {
          ctx.clearRect(0, 0, state._canvas.width, state._canvas.height);
          ctx.drawImage(img, 0, 0, state._canvas.width, state._canvas.height);
        };
      }
    }
  },
  actions: {
    async loadFile({ state }: any, id: string) {
      const ctx = state._canvas.getContext("2d");
      try {
        const res = await fetch(
          `${process.env.VUE_APP_BASE_URL}/image/?id=${id}`
        );

        const imgUrl = await res.json();
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
          ctx.clearRect(0, 0, state._canvas.width, state._canvas.height);
          ctx.drawImage(img, 0, 0, state._canvas.width, state._canvas.height);
        };
      } catch (e) {
        console.log(e);
      }
    },
    async saveCanvas({ state }: any, id: string) {
      try {
        fetch(`${process.env.VUE_APP_BASE_URL}/image/?id=${id}`, {
          method: "POST",
          body: JSON.stringify({ imageUrl: state._canvas.toDataURL() }),
          headers: { "Content-Type": "application/json" }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
