<template>
  <div class="admin-panel grid-admin">
    <div class="admin-panel--header--wrapper">
      <div class="admin-panel--header">
        <div></div>
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
        <router-link
          to="/project-admin"
          @click.native="id = 'requests'"
          :class="(id === 'requests') ? activeClass : ''"
        >
          <v-icon class="admin-icon" name="life-ring" label="Спасательный круг"/>
          <span>Заявки приютов</span>
        </router-link>

        <router-link
          to="/project-admin/manageShelters"
          @click.native="id = 'shelters';"
          :class="(id === 'shelters') ? activeClass : ''"
        >
          <v-icon class="admin-icon" name="home" label="Домик"/>
          <span>Приюты в проекте</span>
        </router-link>

        <router-link
          to="/project-admin/manageFinance"
          @click.native="id = 'finance'; "
          :class="(id === 'finance') ? activeClass : ''"
        >
          <v-icon class="admin-icon" name="life-ring" label="Спасательный круг"/>
          <span>Финансы</span>
        </router-link>
      </div>
    </div>

    <mobile-menu class="nav--mobile"></mobile-menu>

    <div class="admin-panel--content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import mobileMenu from "../menu/mobile-menu-admin.vue";

export default {
  data: () => {
    return {
      id: "requests",
      activeClass: "admin-panel--menu--list__active"
    };
  },
  components: {
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
</script>

<style lang='less'>
@import "../../assets/css/adminImportCSS";
</style>
