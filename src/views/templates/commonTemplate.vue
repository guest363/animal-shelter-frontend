<template>
  <div id="app">
    <main-menu></main-menu>
    <mobile-menu class="nav--mobile"></mobile-menu>

    <transition name="fade">
      <router-view id="main"></router-view>
    </transition>

    <app-footer></app-footer>
    <div>
      <img src="https://mc.yandex.ru/watch/53471938" style="position:absolute; left:-9999px;" alt>
    </div>
  </div>
</template>

<script>
import mainMenu from "../.././views/menu/main-menu.vue";
import mobileMenu from "../.././views/menu/mobile-menu.vue";
import footer from "../.././views/footer.vue";
import yaMetrikaInit from "../../assets/js/support/yametruka.js";

const common = {
  components: {
    "main-menu": mainMenu,
    "mobile-menu": mobileMenu,
    "app-footer": footer
  },
  mounted() {
    /* Инициализируем яндекс метрику для всех страниц с этим шаблонам */
    yaMetrikaInit();
    /* _____________________________________________________________________ */
  }
};
export default common;
</script>