<template>
  <Slide right>
    <router-link class="nav--ul--mob--top-link" to="#">
      <v-icon class="nav--mobile-icon" name="paw" label="Лапа животного"/>
      <span>Животные</span>
    </router-link>

   <!--  <router-link class="nav--ul--mob--link" to="#"><span>Кошки</span></router-link>
    <router-link class="nav--ul--mob--link" to="#"><span>Собаки</span></router-link> -->
    <router-link class="nav--ul--mob--top-link" to="#">
      <v-icon class="nav--mobile-icon" name="home" label="Дом"/>
      <span>О приюте</span>
    </router-link>

    <router-link class="nav--ul--mob--top-link" to="#">
      <v-icon class="nav--mobile-icon" name="life-ring" label="Спасательный круг"/>
      <span>Как помочь</span>
    </router-link>

        <router-link class="nav--ul--mob--top-link" to="#">
      <v-icon class="nav--mobile-icon" name="hand-holding-usd" label="Рука с пожертвованием"/>
      <span>Пожертвования</span>
    </router-link>

        <router-link class="nav--ul--mob--top-link" to="#">
      <v-icon class="nav--mobile-icon" name="newspaper" label="Газета"/>
      <span>Блог</span>
    </router-link>

        <router-link class="nav--ul--mob--top-link" to="#">
      <v-icon class="nav--mobile-icon" name="file-invoice-dollar" label="Лист с долларом"/>
      <span>Отчеты</span>
    </router-link>
  </Slide>
</template>

<script>
import { Slide } from "vue-burger-menu"; // import the CSS transitions you wish to use, in this case we are using `Slide`

export default {
  components: {
    Slide // Register your component
  }
};
</script>
