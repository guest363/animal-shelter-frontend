<template>
  <header id="header" class="content-wrapper">
    <nav class="nav">
      <custom-logo :textColor="`var(--grey)`"/>
      <ul class="nav--ul l-style-none">
        <li>
          <nav-select
            header="Животные"
            headerLink="#"
            :active="true"
            v-bind:items="{ Кошки: '#', 
                                      Собаки: '#'}"
          />
        </li>
        <li>
          <router-link to="#">О приюте</router-link>
        </li>
        <li>
          <nav-select
            header="Помочь"
            headerLink="#"
            :active="false"
            v-bind:items="{ Деньгами: '#', 
                                      Вещами: '#',
                                      Услугами: '#',
                                      Волонтерство: '#'}"
          />
        </li>
        <li>
          <router-link to="#">Блог</router-link>
        </li>
        <li>
          <nav-select
            header="Отчеты"
            headerLink="#"
            :active="false"
            v-bind:items="{ Финансы: '#', 
                                      Мероприятия: '#'}"
          />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import navSelect from "../../components/navSelect.vue";

export default {
  name: "main-menu",
  data: () => {
    return {
      mobileMenu: {}
    };
  },
  components: {
    "nav-select": navSelect
  },
  computed: {
  }
};
</script>

<style>
</style>
