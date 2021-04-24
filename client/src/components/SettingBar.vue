<template>
  <div class="sidebar">
    <div class="sidebar__item">
      <label for="weight">Толщина линии: </label>
      <input
        id="weight"
        type="number"
        name="lineWidth"
        min="1"
        max="50"
        v-model="lineWidth"
      />
    </div>

    <div class="sidebar__item">
      <label for="stroke">Цвет линии: </label>
      <input
        id="stroke"
        type="color"
        name="strokeStyle"
        v-model="strokeStyle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const strokeStyle = ref("#000000");
    const lineWidth = ref(1);
    const selectedTool = computed(
      () => store.getters["canvasState/selectedTool"]
    );

    watch([strokeStyle, lineWidth, selectedTool], () => {
      if (["brush", "line", "eraser"].includes(selectedTool.value)) {
        store.commit("canvasState/setStyles", {
          strokeStyle: strokeStyle.value,
          lineWidth: lineWidth.value
        });
      }
    });

    return { strokeStyle, lineWidth };
  }
});
</script>

<style lang="less" scoped>
.sidebar {
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 5px 5px grey;
  height: 42px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: rgba(128, 128, 128, 0.2);

  &__item {
    padding: 10px;
    border-right: 1px solid grey;
    color: grey;

    &:last-child {
      border: none;
    }

    input[type="number"] {
      width: 50px;
      padding: 2px;
    }
  }
}
</style>
