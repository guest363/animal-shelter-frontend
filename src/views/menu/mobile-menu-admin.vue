<template>
  <Slide right>
    <span>Питомцы</span>
    <router-link class="nav--ul--mob--top-link" to="/admin/add-animal">
      <v-icon class="nav--mobile-icon" name="paw"/>
      <span>Добавить нового питомца</span>
    </router-link>

    <router-link class="nav--ul--mob--top-link" to="/admin/edit-animal">
      <v-icon class="nav--mobile-icon" name="regular/edit"/>
      <span>Редактировать каталог питомцев</span>
    </router-link>

    <span>Финансы</span>
    <router-link class="nav--ul--mob--top-link" to="/admin/add-project">
      <v-icon class="nav--mobile-icon" name="regular/edit"/>
      <span>Добавить новый проект по сбору средст</span>
    </router-link>

    <span>Приют</span>
    <router-link class="nav--ul--mob--top-link" to="/admin/edit-site">
      <v-icon class="nav--mobile-icon" name="regular/edit"/>
      <span>Главная информация</span>
    </router-link>

    <router-link class="nav--ul--mob--top-link" to="#">
      <v-icon class="nav--mobile-icon" name="regular/edit"/>
      <span>Отчеты</span>
    </router-link>

    <router-link class="nav--ul--mob--top-link" to="#">
      <v-icon class="nav--mobile-icon" name="regular/edit"/>
      <span>Блог</span>
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
<style lang='less'>
 .bm-burger-button {
    top: 1.5em!important;
    right: 1em!important;
 }
 .bm-item-list{
     margin: 0!important;
 }
 .bm-item-list>* {
    padding: .4em!important;
 }
</style>
