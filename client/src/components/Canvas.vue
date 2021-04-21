<template>
  <div class="canvas-wrap">
    <canvas ref="canvasRef" width="700" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Canvas",
  setup() {
    const store = useStore();
    const canvasRef = ref();

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

    return { canvasRef };
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
