<template>
  <modal
    name="custom-alert"
    :adaptive="true"
    :max-width="600"
    :max-height="400"
    width="80%"
    height="auto"
  >
    <div class="modal--window-decor">
      <div class="modal--window-decor--one"></div>
      <div class="modal--window-decor--two"></div>
      <div class="modal--window-decor--three"></div>
      <div class="modal--window-decor--four"></div>
      <div class="modal--window-decor--five"></div>
    </div>
    <div class="modal--body">
      <h2>{{header}}</h2>
      <p v-html="text"></p>
      <button class="common--button modal--button--main" @click="$modal.hide('custom-alert')">Ясно</button>
    </div>
  </modal>
</template>
<script>
import closeModalMixin from "../../plugins/mixin/close-modal-mixin.js";
export default {
  name: "custom-alert",
  mixins: [closeModalMixin],
  props: {
    text: String,
    header: {
      type: String,
      default: "Результат:"
    }
  },
  methods: {
    close(e) {
      if (e.keyCode === 27) this.$modal.hide("custom-alert");
    }
  }
};
</script>
