const state = {
  canvas: null as any
};

type CanvasStateType = typeof state;

export default {
  namespaced: true,
  state,

  getters: {
    getCanvas: (state: CanvasStateType) => state.canvas
  },

  mutations: {
    setCanvas(state: CanvasStateType, canvas: any) {
      state.canvas = canvas;
    }
  }
};
