<template>
  <div>
    <picture class="main--fs--img">
      <source srcset="../assets/img/cat-2560.jpg" media="(min-width: 2200px)">
      <source srcset="../assets/img/cat-2200.jpg" media="(min-width: 1960px)">
      <source srcset="../assets/img/cat-1920.jpg" media="(min-width: 1650px)">
      <source srcset="../assets/img/cat-1366.jpg" media="(min-width: 1300px)">
      <source srcset="../assets/img/cat-1280.jpg" media="(min-width: 1200px)">
      <img src alt="Кот смотрит на стену">
    </picture>
    <div class="content-wrapper">
      <div class="main--fs grid-main-fs">
        <div class="main--fs--donate">
          <h1 class="main--fs--donate--header">В настоящий момент собираем средства на:</h1>
          <span class="main--fs--donate--subHeader">
            <router-link to="/">Home</router-link>|
            <router-link to="/login">Login</router-link>|
            <router-link to="/admin">Admin Panel</router-link>
          </span>
          <div class="main--fs--donate--buttons">
            <button class="common--button main--fs--buttomn" @click="1" type="submit">помочь</button>
            <button class="common--button main--fs--buttomn" @click="1" type="submit">узнать больше</button>
          </div>
        </div>
        <div></div>
        <div class="main--fs--counter">
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
      </div>
    </div>
    <!-- <div class="grid-block wow slideInUp" data-wow-duration="800ms" data-wow-offset="1"> -->
    <div class="grid-block">
        <picture class="grid-block--img">
          <img class="grid-block--img__photo" src="../assets/img/owner.jpg" alt="Хозяйка приюта с тремя котами">
        </picture>
        <div class="grid-block--text flex-center">
          <span class="grid-block--text--main">
            {{this.$store.state.shelterCommon.about}}
          </span>
          <span class="grid-block--text--author">
             {{this.$store.state.shelterCommon.owner}}
          </span>
          <picture class="grid-block--text--img">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="301" height="127">
              <path
                d="M124.482,36.156c-8.011-1.281-16.366,3.302-22.303,8.135c-5.957,4.849-10.936,11.611-14.194,18.547 c-1.233,2.625-2.497,6.038-1.417,8.922c2.312,6.181,12.275,0.884,15.647-0.989c15.661-8.695,28.406-23.312,39.652-36.902 c0.708-0.856-0.477-2.089-1.237-1.237c-5.823,6.519-11.356,13.336-16.493,20.409c-2.316,3.189-13.344,16.572-7.612,20.613 c5.129,3.617,17.05-10.836,19.618-13.547c4.421-4.667,8.593-9.578,12.584-14.616c2.482-3.133,5.316-6.403,7.026-10.048 c0.486-1.034-0.84-1.782-1.511-0.883c-6.023,8.071-11.977,16.424-16.659,25.354c-1.381,2.635-3.889,7.13-1.502,9.877 c2.354,2.71,6.876-5.637,7.422-6.849c0.46-1.02-1.048-1.911-1.511-0.883c-0.823,1.826-1.931,3.485-3.212,5.021 c-2.167,2.597-1.567-1.989-1.224-2.938c1.527-4.222,4.182-8.151,6.571-11.919c3.64-5.743,7.56-11.332,11.626-16.782 c-0.503-0.294-1.007-0.589-1.511-0.883c-3.403,7.251-9.86,13.722-15.093,19.658c-3.559,4.037-7.275,7.944-11.232,11.594 c-2.516,2.321-6.077,6.019-9.694,6.458c-3.602,0.438,0.76-7.944,1.274-8.891c2.437-4.484,5.501-8.646,8.562-12.717 c4.35-5.786,8.985-11.393,13.808-16.792c-0.413-0.413-0.825-0.825-1.237-1.237c-9.974,12.052-20.773,23.816-33.555,32.956 c-2.859,2.044-15.501,11.224-18.766,5.797c-1.401-2.329,0.516-6.237,1.498-8.326c2.955-6.291,7.507-11.972,12.593-16.651 c5.353-4.924,14.084-9.768,21.616-8.563C125.121,38.021,125.595,36.334,124.482,36.156L124.482,36.156z"
              ></path>
              <path
                d="M142.191,68.005c14.577-8.485,28.833-18.597,40.677-30.637c-0.413-0.413-0.825-0.825-1.237-1.237 c-8.606,10.195-17.007,20.643-26,30.5c0.413,0.413,0.825,0.825,1.237,1.237c0.643-0.746,1.313-1.466,1.995-2.176 c0.538-0.56,1.108-1.082,1.69-1.595c1.648-1.454,0.436-0.134,0.254,0.528c-0.411,1.5-0.286,3.164,0.249,4.61 c1.363,3.689,5.364,3.848,8.588,2.786c8.922-2.938,17.09-12.429,22.278-19.756c4.055-5.728,6.022-13.629,1.258-19.552 c-9.34-11.613-27.899-12.159-41.465-11.023c-14.554,1.219-33.262,5.545-39.54,20.462c-2.307,5.482-2.368,12.337,1.506,17.068 c3.68,4.493,10.282,5.767,15.725,6.264c16.744,1.528,35.16-4.572,49.207-13.368c10.419-6.524,23.814-20.317,12.813-32.217 c-7.739-8.371-22.905-12.474-34.007-12.783c-35.532-0.991-72.07,6.742-103.691,22.997C38.049,38.173,21.63,48.295,10.6,62.381 C7.839,65.908,4.362,70.784,4.125,75.5c-0.057,1.129,1.694,1.123,1.75,0c0.386-7.693,8.752-15.612,13.889-20.435 c20.291-19.055,47.779-31.4,74.347-38.589c19.487-5.272,39.875-7.825,60.062-7.67c12.014,0.092,26.45,3.437,35.454,11.768 c16.167,14.958-14.03,32.253-25.337,36.847c-8.647,3.513-17.931,5.751-27.248,6.365c-7.043,0.463-15.664,0.055-21.224-4.874 c-6.535-5.792-2.975-16.748,1.828-22.371c5.883-6.887,15.492-9.884,24.043-11.669c15.107-3.155,36.286-4.029,48.509,7.132 c8.081,7.378,2.256,17.499-3.567,24.127c-4.369,4.972-13.534,16.082-21.39,14.702c-4.639-0.814-1.785-5.789-2.473-8.404 c-0.831-3.161-6.57,3.543-7.137,4.202c-0.729,0.847,0.471,2.078,1.237,1.237c8.994-9.857,17.394-20.305,26-30.5 c0.717-0.85-0.435-2.054-1.237-1.237c-11.748,11.941-25.861,21.945-40.323,30.363C140.334,67.062,141.214,68.574,142.191,68.005 L142.191,68.005z"
              ></path>
              <path
                d="M184.869,66.619c1.609-1.604,12.514-12.912,14.262-11.5c0.06-0.458,0.118-0.916,0.178-1.374 c-3.646,1.849-7.097,4.172-10.066,6.983c-1.399,1.325-5.368,6.367-2.553,8.213c2.593,1.699,6.86-2.104,8.721-3.466 c4.21-3.083,8.078-6.626,11.959-10.105c0.738-0.662-0.233-1.926-1.061-1.374c-1.944,1.297-14.765,11.083-9.333,13.93 c2.442,1.28,5.704-1.298,7.624-2.538c4.376-2.824,8.477-6.906,13.383-8.792c-0.283-0.487-0.567-0.975-0.852-1.462 c-2.677,3.032-5.528,6.337-7.153,10.068c-0.676,1.553-0.216,4.25,2.026,2.946c4.646-2.703,7.943-7.347,12.534-10.206 c2.386-1.486,1.636-1.341,0.92,0.298c-1.46,3.344-3.854,6.379-5.964,9.321c-0.599,0.835,0.679,1.717,1.375,1.06 c3.933-3.713,8.109-7.266,12.648-10.214c1.297-0.843,2.67-1.576,4.157-2.014c2.315-0.682,0.396,1.968,0.051,2.52 c-0.966,1.542-2.162,2.949-2.813,4.666c-1.708,4.509,8.05,0.266,8.545,0.063c3.643-1.488,7.185-3.213,10.581-5.199 c1.609-0.941,3.515-2.714,5.461-2.815c-0.077-0.573-0.155-1.146-0.232-1.719c-3.075,1.269-13.767,4.851-12.493,9.508 c0.556,2.035,3.805,1.562,5.247,1.31c4.248-0.744,7.914-3.889,9.984-7.533c0.48-0.845-0.702-1.823-1.375-1.06 c-1.706,1.935-6.55,6.534-5.748,9.398c1.05,3.753,7.294-1.488,8.609-2.366c8.035-5.361,16.493-10.558,26.327-11.479 c9.479-0.888,4.514,7.591,1.487,12.061c-4.726,6.98-10.643,13.042-16.178,19.347c-8.544,9.731-6.031,25.637-3.973,37.14 c0.198,1.109,1.885,0.639,1.688-0.465c-2.15-12.015-4.428-27.681,5.187-37.191c6.006-5.942,11.748-13.043,16.245-20.174 c1.547-2.455,4.294-6.907,2.748-9.953c-2.197-4.334-9.547-2.379-13.075-1.556c-8.129,1.896-15.349,6.763-22.188,11.326 c-1.537,1.025-6.512,4.666-4.064,0.578c1.167-1.948,2.673-3.728,4.173-5.428c-0.459-0.354-0.917-0.707-1.375-1.06 c-1.659,2.922-4.009,4.891-7.099,6.179c-2.596,1.083-6.873,0.899-2.972-2.033c2.756-2.072,6.133-3.551,9.309-4.861 c0.843-0.348,0.838-1.774-0.232-1.719c-1.48,0.077-2.667,0.789-3.904,1.552c-3.164,1.952-6.376,3.717-9.752,5.282 c-2.556,1.185-5.171,2.289-7.873,3.093c-2.173,0.646-0.917-0.737-0.188-1.846c1.047-1.594,2.54-3.255,2.824-5.206 c0.659-4.526-6.775-0.591-7.973,0.142c-4.711,2.884-8.997,6.706-13.003,10.488c0.459,0.354,0.917,0.707,1.375,1.06 c0.232-0.324,10.776-14.833,4.333-12.823c-4.692,1.463-8.622,6.437-12.208,9.55c-3.775,3.278,0.265-2.492,1.169-3.757 c1.252-1.753,2.643-3.427,4.069-5.042c0.525-0.596,0.032-1.802-0.852-1.462c-5.358,2.06-9.844,6.415-14.627,9.502 c-1.254,0.809-2.565,1.563-3.989,2.025c-0.907-1.199-0.958-2.275-0.149-3.227c0.643-1.091,1.619-2.026,2.503-2.923 c1.773-1.799,3.838-3.377,5.937-4.779c-0.354-0.458-0.707-0.916-1.061-1.374c-5.054,4.531-10.136,9.533-16.141,12.787 c-2.68,1.452-2.537-0.715-1.352-2.757c1.145-1.971,3.273-3.565,5.053-4.906c2.021-1.522,4.243-2.855,6.5-4 c0.47-0.238,0.605-1.028,0.178-1.374c-3.784-3.054-14.34,9.11-16.738,11.5C182.831,66.179,184.069,67.416,184.869,66.619 L184.869,66.619z"
              ></path>
            </svg>
          </picture>
        </div>
        <div class="grid-block--header">
          <h2 class="grid-block--header--h">О нас</h2>
        </div>
          <picture class="grid-block--animal">
            <img class="grid-block--animal--img" src="../assets/img/animal2.jpg" alt="Cat">
          </picture>
        <div class="grid-block--info flex-center">
          <h3 class="grid-block--info--header">Данные НКО</h3>
          <ol>
            <li>Инн: {{this.$store.state.shelterCommon.inn}}</li>
            <li>ОГРН: {{this.$store.state.shelterCommon.ogrn}}</li>
            <li>Юридический адрес: {{this.$store.state.shelterCommon.address}}</li>
          </ol>
          <button class="common--button grid-block--info--button" @click="1" type="submit">ПОДРОБНЕЕ</button>
        </div>
      </div>

      <div class="grid-block__quota">
         <picture class="grid-block__quota--img">
          <img
            class="grid-block--img__animal"
            src="../assets/img/cat-quota.jpg"
            alt="Кот смотрит на своих хозяев сидя между их ног"
          >
        </picture>
        <div class="grid-block__quota--text">
          “Маленькая помощь лучше, чем большое сочувствие.”
        </div>
      </div>
      <div class="grid-block grid-block__animal wow slideInUp" data-wow-duration="800ms" data-wow-offset="1">
        <div class="grid-block--header__animal">
          <h2 class="grid-block--header--h">Питомцы</h2>
        </div>
        <div class="grid-block--text flex-center">
          <h2 class="grid-block--text--header">Привет! Меня зовут {{getRandomAnimal.name}}!</h2>
          <span class="grid-block--text--wait">Жду хозяев с {{formatDate(getRandomAnimal.date)}}</span>
          <span class="grid-block--text--main__animal">{{getRandomAnimal.story}}</span>
          <router-link  class="grid-block--text--main__animal" to="/">Подробнее...</router-link>
          <button class="common--button grid-block__animal--button" type="submit">Смотреть всех</button>
        </div>
        <picture class="grid-block--img">
          <img
            class="grid-block--img__animal"
            :src="getRandomAnimal.photo[0]"
            :alt="`Фотография питомца ${(getRandomAnimal.name)} из приюта Мокрый Нос`"
          >
        </picture>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations, mapActions, mapState  } from "vuex";
import { setTimeout } from "timers";
import AnimatedNumber from "animated-number-vue";
/* import Wow from "wow.js"; */
import monthSet from '../store/month.js';

export default {
  name: "home",
  data: () => {
    return {};
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
      if(date === ''){
        return '';
      }
      const date = new Date(str);
      return `${date.getDate()} ${monthSet[date.getMonth()]} ${date.getFullYear()}`
    }
  },
  computed: {
    ...mapGetters(["getCatCount", "getDogCount", "getAnimals", "getRandomAnimal"]),
  },
  mounted() {

  }
};
</script>
<style lang='less'>

</style>
