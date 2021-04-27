<template>
  <div class="canvas-wrap">
    <canvas
      ref="canvasRef"
      width="700"
      height="500"
      @mousedown="mouseDownHandler"
      @mouseup="mouseUpHandler"
    ></canvas>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  IFigure,
  IMessageSocket,
  sendMessage,
  subscribeMessage
} from "../libs/websocket";
import brush from "../libs/brush";
import rect from "../libs/rect";
import line from "../libs/line";
import circle from "../libs/circle";
import eraser from "../libs/eraser";

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const canvasRef = ref();
    const username = computed(() => store.getters["canvasState/username"]);

    onMounted(() => {
      store.commit("canvasState/setCanvas", canvasRef.value);

      document.addEventListener("keydown", keyDownHandler);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", keyDownHandler);
    });

    function keyDownHandler(e: any) {
      const ctx = canvasRef.value.getContext("2d");
      if (e.code === "KeyC")
        ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    }

    function mouseDownHandler() {
      store.commit("canvasState/pushToUndo", canvasRef.value.toDataURL());
    }

    function mouseUpHandler() {
      store.dispatch("canvasState/saveCanvas", route.params.id);
    }

    function drawHandler(msg: IMessageSocket) {
      const figure = msg.figure as IFigure;

      const ctx = canvasRef.value.getContext("2d");
      switch (figure.type) {
        case "brush":
          brush.draw(ctx, figure);
          break;
        case "rect":
          rect.draw(ctx, figure);
          break;
        case "line":
          line.draw(ctx, figure);
          break;
        case "circle":
          circle.draw(ctx, figure);
          break;
        case "eraser":
          eraser.draw(ctx, figure);
          break;
        case "finish":
          ctx.beginPath();
          break;
      }
    }

    watch(
      () => route.params.id,
      (id) => {
        store.dispatch("canvasState/loadFile", id);
      }
    );

    watch(username, () => {
      if (username.value) {
        const sessionId = route.params.id as string;
        store.commit("canvasState/setSessionId", sessionId);
        brush(canvasRef.value, sessionId);

        sendMessage({
          sessionId,
          username: username.value,
          method: "connection"
        });

        subscribeMessage((msg) => {
          switch (msg.method) {
            case "connection":
              console.log(`Пользователь ${msg.username} присоединился`);
              break;
            case "draw":
              drawHandler(msg);
              break;
            case "exit":
              console.log(msg.message);
          }
        });
      }
    });

    return { canvasRef, mouseDownHandler, mouseUpHandler };
  }
});
</script>

<style lang="less" scoped>
.canvas-wrap {
  margin: 20px auto 0;
  max-width: 700px;
  height: 500px;
  box-shadow: 5px 5px 10px grey;
}
</style>
