<template>
  <div class="admin-panel grid-admin">
    <div class="admin-panel--header--wrapper">
      <div class="admin-panel--header">
        <custom-logo
          class="admin-panel--header--logo"
          :textColor="`var(--grey)`"
          :width="`30`"
          :height="`30`"
        />
        <div class="admin-panel--header--user">
          <custom-dropdown style="min-width: 170px" :header="getUserName" @logout="logout"/>
        </div>
      </div>
    </div>
    <div class="admin-panel--menu">
      <div class="admin-panel--menu--list">
        <a
          @click="id = 'animal'; currenListElements = animalSub"
          :class="(id === 'animal') ? activeClass : ''"
        >
          <v-icon class="admin-icon" name="dog" label="Собака"/>
          <span>Питомцы</span>
        </a>

        <a
          @click="id = 'finance'; currenListElements = financelSub"
          :class="(id === 'finance') ? activeClass : ''"
        >
          <v-icon class="admin-icon" name="life-ring" label="Спасательный круг"/>
          <span>Финансы</span>
        </a>

        <a
          @click="id = 'shelterInfo'; currenListElements = shelterInfoSub"
          :class="(id === 'shelterInfo') ? activeClass : ''"
        >
          <v-icon class="admin-icon" name="home" label="Домик"/>
          <span>Приют</span>
        </a>
      </div>
    </div>
    <sub-list
      :activeClass="'admin-panel--menu--list__active--sub'"
      :listElements="currenListElements || []"
      v-on:close="currenListElements = ''"
    />

    <mobile-menu class="nav--mobile"></mobile-menu>

    <div class="admin-panel--content" @click="currenListElements = ''">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import subList from "../../components/admin/adminSublist.vue";
import { mapGetters, mapMutations } from "vuex";
import mobileMenu from "../menu/mobile-menu-admin.vue";

const admin = {
  name: "Admin",
  data: () => {
    return {
      currenListElements: "",
      id: "animal",
      activeClass: "admin-panel--menu--list__active",
      animalSub: [
        {
          link: "/admin/add-animal",
          text: "Добавить нового питомца",
          icon: "paw",
          iconLabel: "Лапа животного"
        },
        {
          link: "/admin/edit-animal",
          text: "Редактировать каталог питомцев",
          icon: "regular/edit",
          iconLabel: "Карандаш в квадрате"
        }
      ],
      financelSub: [
        {
          link: "/admin/add-project",
          text: "Добавить новый проект по сбору средст",
          icon: "regular/edit",
          iconLabel: "Карандаш в квадрате"
        }
      ],
      shelterInfoSub: [
        {
          link: "/admin/edit-site",
          text: "Главная информация",
          icon: "regular/edit",
          iconLabel: "Карандаш в квадрате"
        },
        {
          link: "/admin/edit-site",
          text: "Отчеты",
          icon: "regular/edit",
          iconLabel: "Карандаш в квадрате"
        },
        {
          link: "/admin/edit-site",
          text: "Блог",
          icon: "regular/edit",
          iconLabel: "Карандаш в квадрате"
        }
      ]
    };
  },
  components: {
    "sub-list": subList,
    "mobile-menu": mobileMenu
  },
  computed: {
    ...mapGetters(["getUserName"])
  },
  methods: {
    ...mapMutations(["storeLogout"]),
    logout() {
      this.storeLogout();
      this.$router.push("/");
    }
  },
  mounted() {}
};
export default admin;
</script>

<style lang='less'>
@import "../../assets/css/adminImportCSS";
</style>
