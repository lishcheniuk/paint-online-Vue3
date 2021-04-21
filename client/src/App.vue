<template>
  <div class="container">
    <Toolbar />
    <SettingBar />
    <Canvas />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Canvas from "./components/Canvas.vue";
import Toolbar from "./components/Toolbar.vue";
import SettingBar from "./components/SettingBar.vue";

export default defineComponent({
  name: "App",
  components: { Canvas, Toolbar, SettingBar }
});
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  margin: 0 10px;
}

ul {
  list-style-type: none;
}
</style>
