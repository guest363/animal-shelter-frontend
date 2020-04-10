<template>
  <form class="wrapper--layouts" :style="{backgroundColor: bgColor}">
    <div class="loader" v-show="loader">
      <loader></loader>
    </div>
    <div class="login content-wrapper flex-center">
      <img
        class="login--close"
        :src="closeIcon"
        @click="$router.push('/')"
        alt="Иконка закрытия окна"
      >
      <div class="flex-center">
        <object
          class="login--avatar"
          type="image/svg+xml"
          :data="avatarUrl"
          width="200"
          height="200"
        >Your browser does not support SVG</object>
        <h2 class="login--header" v-bind:style="{ color: bgColor }">Аутентификация</h2>

        <custom-input v-model="login" :textLabel="`Логин`" :onEnter="auth" :type="`text`"></custom-input>

        <custom-input
          v-model="password"
          :maxlength="`60`"
          :textLabel="`Пароль`"
          :onEnter="auth"
          :type="`password`"
        ></custom-input>

        <button v-on:click.prevent="auth" class="login--submit common--button" type="submit">Войти</button>
      </div>
    </div>
    <custom-alert :maxlength="`60`" :header="alert.header" :text="alert.text"></custom-alert>
  </form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import animalPackColor from "../assets/js/animalPackColor.js";
import closeModalMixin from "../plugins/mixin/close-modal-mixin.js";

const login = {
  name: "login",
  mixins: [closeModalMixin],
  data: () => {
    return {
      login: "",
      loader: false,
      password: "",
      closeIcon: require(`../static/common-icon/close.svg`),
      bgColor: "",
      alert: {
        header: "Ошибка",
        text: ""
      }
    };
  },
  computed: {
    avatarUrl() {
      const animalPack = animalPackColor;
      const randomNumber = Math.floor(Math.random() * animalPack.length);
      const imgSrc = require(`../static/svg-icon-animal/${
        animalPack[randomNumber].animal
      }.svg`);
      this.bgColor = animalPack[randomNumber].bg;
      return imgSrc;
    }
  },
  methods: {
    ...mapActions({
      storeAuth: "auth",
      checkTocken: "checkTocken"
    }),
    showModal(data) {
      this.alert.text = data;
      this.$modal.show("custom-alert");
    },
    auth() {
      this.loader = true;
      const authData = {
        password: this.password,
        username: this.login,
        grant_type: "password",
        client_id: "Local"
      };
      this.storeAuth(authData)
        .then(response => {
          this.$router.push(response);
          this.loader = false;
        })
        .catch(reject => {
          this.showModal(reject);
        });
    }
  },
  mounted() {
    /* Если в локальном хранилище есть токен, сверить его на сервере
    и в случае его корректоности не запрашивать логин */
    if (localStorage.getItem("jwt") !== null) {
      this.checkTocken().then(response => {
        this.$router.push(response);
      });
    }
  }
};
export default login;
</script>

<style lang='less' scoped>
@import "../assets/css/layout/login";
</style>
