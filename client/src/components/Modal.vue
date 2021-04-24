<template>
  <div class="modal" v-if="showModal">
    <form class="modal__form">
      <h3>Добро пожаловать</h3>
      <input
        class="modal__input"
        type="text"
        placeholder="Введите ваше имя"
        ref="inputRef"
      />
      <button class="modal__btn" @click.prevent="signIn">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const inputRef = ref();
    const showModal = ref(true);
    const store = useStore();

    onMounted(() => {
      inputRef.value.focus();
    });

    function signIn() {
      const value = inputRef.value.value.trim();

      if (value) {
        showModal.value = false;
        store.commit("canvasState/setUsername", value);
      } else inputRef.value.value = "";
    }

    return { signIn, showModal, inputRef };
  }
});
</script>

<style lang="less">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.486);

  &__form {
    width: 250px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #fff;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: rgb(204, 202, 202);
  }

  &__input {
    font-size: 16px;
    padding: 2px;
    margin: 10px 0;

    &::placeholder {
      font-size: 14px;
    }
  }

  &__btn {
    padding: 5px 15px;
    align-self: flex-start;
  }
}
</style>
