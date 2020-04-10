<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { setTimeout } from "timers";

const app = {
  methods: {
    ...mapActions([])
  },
  computed: {
    ...mapGetters(["getYaMapUrl"])
  },
  mounted() {
    const addScript = src => {
      setTimeout(() => {
      const script = document.createElement("script");
      script.src = src;
      script.type = "text/javascript";
      script.async = true; // чтобы гарантировать порядок
      document.head.appendChild(script);
      }, 500);
    };
    /* Загрузка скриптов Яндекс карты */
    addScript(this.getYaMapUrl);
    /* ------------------------------ */
    const calcRealHeightToContent = () => {
          let vh = window.innerHeight * 0.01;
          // Then we set the value in the --vh custom property to the root of the document
          document.documentElement.style.setProperty("--vh", `${vh}px`);

          // We listen to the resize event
          window.addEventListener("resize", () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
          });
    };
    calcRealHeightToContent();

  }
};
export default app;
</script>
<style lang='less'>
@import "./assets/css/main.less";
</style>


