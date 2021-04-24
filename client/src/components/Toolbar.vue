<template>
  <div class="toolbar">
    <ul class="toolbar__list-left">
      <li
        class="toolbar__item"
        v-for="(item, index) of iconsTools"
        :key="index"
        @click="selectTools(item.name)"
        :class="{ 'toolbar__item--selected': item.name === selectedTool }"
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
        @click="step('undo')"
        :class="{
          'toolbar__item--active': !undoListLength
        }"
      >
        <img src="/images/undo.png" alt="Назад" title="Назад" />
      </li>
      <li
        class="toolbar__item"
        @click="step('redo')"
        :class="{
          'toolbar__item--active': !$store.getters['canvasState/redoList']
            .length
        }"
      >
        <img src="/images/redo.png" alt="Вперед" title="Вперед" />
      </li>
      <li
        class="toolbar__item"
        @click="download"
        :class="{
          'toolbar__item--active': !undoListLength
        }"
      >
        <img src="/images/save.png" alt="Загрузить" title="Загрузить" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import rect from "../libs/rect";
import brush from "../libs/brush";
import line from "../libs/line";
import circle from "../libs/circle";
import eraser from "../libs/eraser";
import { clearHandlersCanvas } from "../libs/tools";

export default defineComponent({
  setup() {
    const iconsTools = [
      { name: "brush", icon: "brush.png", title: "Кисть" },
      { name: "rect", icon: "rect.png", title: "Прямоугольник" },
      { name: "circle", icon: "circle.png", title: "Круг" },
      { name: "eraser", icon: "eraser.png", title: "Резинка" },
      { name: "line", icon: "line.png", title: "Линия" }
    ];

    const store = useStore();
    const fillStyle = ref("#000000");
    const selectedTool = computed(
      () => store.getters["canvasState/selectedTool"]
    );
    const canvas = computed(() => store.getters["canvasState/getCanvas"]);
    const username = computed(() => store.getters["canvasState/username"]);
    const sessionId = computed(() => store.getters["canvasState/sessionId"]);
    const undoListLength = computed(
      () => store.getters["canvasState/undoList"].length
    );

    function isDraw(btnName: string) {
      if (selectedTool.value === btnName) {
        store.commit("canvasState/setSelectedTool", "");
      } else store.commit("canvasState/setSelectedTool", btnName);

      return !selectedTool.value || !username.value;
    }

    function selectTools(btnName: string) {
      clearHandlersCanvas(canvas.value);

      if (isDraw(btnName)) return false;

      switch (btnName) {
        case "brush":
          return brush(canvas.value, sessionId.value);
        case "rect":
          return rect(canvas.value, sessionId.value);
        case "line":
          return line(canvas.value, sessionId.value);
        case "circle":
          return circle(canvas.value, sessionId.value);
        case "eraser":
          return eraser(canvas.value, sessionId.value);
      }
    }

    function step(type: "undo" | "redo") {
      store.commit(`canvasState/${type}`);
    }

    function download() {
      if (undoListLength.value) {
        const dataUrl = canvas.value.toDataURL();
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = new Date().toJSON() + ".jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }

    watch([fillStyle, selectedTool], ([fill, icon]) => {
      if (["rect", "circle"].includes(icon)) {
        store.commit("canvasState/setStyles", {
          fillStyle: fill,
          strokeStyle: fill
        });
      }
    });

    watch(username, (name) => {
      if (name) {
        store.commit("canvasState/setSelectedTool", "brush");
      }
    });

    return {
      iconsTools,
      selectTools,
      selectedTool,
      fillStyle,
      download,
      undoListLength,
      step
    };
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
  background-color: rgba(128, 128, 128, 0.2);

  &__list-left,
  &__list-right {
    display: flex;
  }

  &__item {
    overflow: hidden;
    padding: 5px 7px;
    cursor: pointer;
    border: 1px solid transparent;
    user-select: none;

    &--selected {
      border-color: grey;
      box-shadow: 0 0 5px grey;
      background-color: #fff;
    }

    &:hover {
      box-shadow: 0 0 5px grey;
    }

    &--active {
      cursor: inherit;
      &:hover {
        box-shadow: none;
      }
    }
  }
}
</style>
