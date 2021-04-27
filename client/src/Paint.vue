<template>
  <div class="container">
    <Modal />
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
import Modal from "./components/Modal.vue";

export default defineComponent({
  name: "Paint",
  components: { Canvas, Toolbar, SettingBar, Modal }
});
</script>

<style>
.container {
  min-height: 100vh;
  padding: 0 10px;
}
</style>
