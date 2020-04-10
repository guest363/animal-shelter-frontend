<template>
  <div>
    <router-view></router-view>
    <div>
      <img src="https://mc.yandex.ru/watch/53471938" style="position:absolute; left:-9999px;" alt>
    </div>
  </div>
</template>

<script>
import yaMetrikaInit from "../../assets/js/support/yametruka.js";

export default {
  name: "fullScreenTemplate",
  data: () => {
    return {};
  },
 mounted() {
    /* Инициализируем яндекс метрику для всех страниц с этим шаблонам */
    yaMetrikaInit();
    /* _____________________________________________________________________ */
  }
};
</script>