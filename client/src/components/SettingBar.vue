<template>
  <div class="sidebar">
    <div class="sidebar__item">
      <label for="weight">Толщина линии: </label>
      <input id="weight" type="number" name="lineWidth" v-model="lineWidth" />
    </div>

    <div class="sidebar__item">
      <label for="stroke">Цвет обводки: </label>
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
import { setStyles } from "../libs/tools";

export default defineComponent({
  setup() {
    const store = useStore();
    const strokeStyle = ref("#000000");
    const lineWidth = ref(1);

    watch([strokeStyle, lineWidth], () => {
      setStyles(store.getters["canvasState/getCanvas"], {
        strokeStyle: strokeStyle.value,
        lineWidth: lineWidth.value
      });
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
