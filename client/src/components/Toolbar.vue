<template>
  <div class="toolbar">
    <ul class="toolbar__list-left">
      <li
        class="toolbar__item"
        v-for="(item, index) of iconsLeft"
        :key="index"
        @click="selectBtn(item.name)"
        :class="{ selected: item.name === selectedIcon }"
      >
        <img
          :src="`/images/${item.icon}`"
          :alt="item.title"
          :title="item.title"
        />
      </li>
      <li class="toolbar__item">
        <input type="color" title="Заливка" v-model="fillStyle" />
      </li>
    </ul>
    <ul class="toolbar__list-right">
      <li
        class="toolbar__item"
        v-for="(item, index) of iconsRight"
        :key="index"
      >
        <img
          :src="`/images/${item.icon}`"
          :alt="item.title"
          :title="item.title"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { rect } from "../libs/rect";
import { brush } from "../libs/brush";
import { clearHandlers, setStyles } from "../libs/tools";
import { line } from "../libs/line";

export default defineComponent({
  setup() {
    const iconsLeft = [
      { name: "brush", icon: "brush.png", title: "Кисть" },
      { name: "rect", icon: "rect.png", title: "Прямоугольник" },
      { name: "circle", icon: "circle.png", title: "Круг" },
      { name: "eraser", icon: "eraser.png", title: "Резинка" },
      { name: "line", icon: "line.png", title: "Линия" }
    ];

    const iconsRight = [
      { icon: "undo.png", title: "Назад" },
      { icon: "redo.png", title: "Вперед" },
      { icon: "save.png", title: "Сохранить" }
    ];

    const store = useStore();
    const selectedIcon = ref("");
    const fillStyle = ref("#000000");
    const canvas = computed(() => store.getters["canvasState/getCanvas"]);

    function selectBtn(btnName: string) {
      clearHandlers(canvas.value);

      if (selectedIcon.value === btnName) {
        return (selectedIcon.value = "");
      }

      selectedIcon.value = btnName;

      switch (btnName) {
        case "brush":
          return brush(canvas.value);
        case "rect":
          return rect(canvas.value);
        case "line":
          return line(canvas.value);
      }
    }

    watch(fillStyle, () => {
      setStyles(canvas.value, { fillStyle: fillStyle.value });
    });

    return { iconsLeft, iconsRight, selectBtn, selectedIcon, fillStyle };
  }
});
</script>

<style lang="less" scoped>
.toolbar {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 3px 5px grey;
  background-color: #fff;
  border-radius: 5px;

  &__list-left,
  &__list-right {
    display: flex;
  }

  &__item {
    overflow: hidden;
    padding: 5px 7px;
    cursor: pointer;
    border: 1px solid transparent;

    &.selected {
      border-color: grey;
      box-shadow: 0 0 5px grey;
    }

    &:hover {
      box-shadow: 0 0 5px grey;
    }
  }
}
</style>
