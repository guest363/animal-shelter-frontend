<template>
  <div>
    <span class="main--fs--donate--subHeader">
      <router-link to="/">Home</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/admin">Admin Panel</router-link>
    </span>
    <div class="home">
      <div class="home--text flex-center">
        <div class="home--text--counters">
          <h1 class="home--text--counters--header">{{headerMap}}</h1>
          <div class="home--text--counters--number">
            <div>
              <animated-number
                class="main--fs--counter--number"
                :formatValue="formatToNumber"
                :value="getCatCount"
                :duration="500"
              />
              <div class="main--fs--counter--text">кошек</div>
            </div>
            <div>
              <animated-number
                class="main--fs--counter--number"
                :formatValue="formatToNumber"
                :value="getDogCount"
                :duration="500"
              />
              <div class="main--fs--counter--text">собак</div>
            </div>
          </div>
          <div class="home--text--button--wrapper">
            <button
              class="common--button home--text--button"
              @click="1"
              type="submit"
            >помочь приютам</button>
            <button
              class="common--button home--text--button"
              @click="1"
              type="submit"
            >посмотреть питомцев</button>
          </div>
        </div>
      </div>
      <div class="home--map--wrapper" id="map--wrapper">
        <div class="home--map--wrapper--img" id="map"></div>
      </div>
      <picture class="home--map--wrapper" id="home--map--wrapper">
        <img class="home--map--wrapper--img" src alt="Карта региона" id="home--map">
      </picture>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import { setTimeout } from "timers";
import AnimatedNumber from "animated-number-vue";
/* import Wow from "wow.js"; */
import monthSet from "../store/month.js";
import yampInit from "../assets/js/support/yampMainScreen.js";

export default {
  name: "home",
  data: () => {
    return {
      headerMap: "Проверяем приюты..."
    };
  },
  components: {
    AnimatedNumber
  },
  methods: {
    ...mapActions(["getSiteInfo"]),
    formatToNumber(value) {
      return value.toFixed(0);
    },
    formatDate(str) {
      if (date === "") {
        return "";
      }
      const date = new Date(str);
      return `${date.getDate()} ${
        monthSet[date.getMonth()]
      } ${date.getFullYear()}`;
    }
  },
  computed: {
    ...mapGetters([
      "getCatCount",
      "getDogCount",
      "getAnimals",
      "getRandomAnimal"
    ])
  },
  mounted() {
    /* new Wow().init(); */
    const yampWrapper = document.querySelector("#map--wrapper");
    const mapStatic = document.querySelector("#home--map");
    const mapStaticWrapper = document.querySelector("#home--map--wrapper");
    yampWrapper.style.display = "none";
    const setMapSrc = (latitude, longitude, zoom = 10) => {
      const src = `https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&z=${zoom}&l=map&size=650,450`;
      mapStatic.setAttribute("src", src);
    };
    const geoBlock = (code, message) => {
      setMapSrc("62.506", "82.459", "3");
      this.headerMap = "По всей России в новом доме нуждаются:";
      yampInit("Russia").then(response => {
        mapStaticWrapper.style.display = "none";
        yampWrapper.style.display = "flex";
      });
    };
    const geoSuccess = position => {
      setMapSrc(position.coords.latitude, position.coords.longitude);
      yampInit().then(response => {
        mapStaticWrapper.style.display = "none";
        yampWrapper.style.display = "flex";
      });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoBlock);
      this.headerMap = "В ващем регионе в новом доме нуждаются:";
    } else {
      geoBlock();
    }
  }
};
</script>
<style lang='less'>
@import "../assets/css/layout/firstScreen";
@import "../assets/css/layout/home";
@import "../assets/css/components/grid-block";
@import "../../node_modules/animate.css/animate.min.css";
</style>
