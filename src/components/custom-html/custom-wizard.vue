<template>
  <form class="wizard" autocomplete="off">
    <div class="wizard--step"></div>
    <div class="wizard--progress">
      <div class="wizard--progress--bg" v-bind:style="{width: progressBgWidth}"></div>
      <div class="wizard--progress--text">{{header}} (шаг {{order + 1}} из {{steps.length}})</div>
    </div>
    <picture class="wizard--picture">
      <img id="wizard--picture--img" :src="picture[0]">
    </picture>
    <label
      v-for="step in steps"
      v-bind:key="step.order"
      :id="`wizard--step-${step.order}`"
      :class="order === step.order ? 'wizard--step--active' : 'wizard--step'"
    >
      <h2 class="wizard--step--header">{{step.header}}</h2>
      <slot :name="`${step.order}`"></slot>
    </label>
    <button
      class="common--button wizard--button wizard--button__prev"
      @click.prevent="validate(false)"
      :disabled="order === 0"
    >
      <v-icon class="wizard--button--icon" name="arrow-left" label="Назад"/>
    </button>
    <button
      class="common--button wizard--button wizard--button__next"
      @click.prevent="validate(true)"
      :disabled="order === steps.length - 1"
      v-show="order !== steps.length - 1"
    >
      <v-icon class="wizard--button--icon" name="arrow-right" label="Вперед"/>
    </button>
    <button
      class="common--button wizard--button wizard--button__next"
      v-show="order === steps.length - 1"
      @click.prevent="$emit('submit')"
      type="submit"
    >Отправить</button>
    <div class="loader" v-show="loader">
      <svg-loaders></svg-loaders>
    </div>
  </form>
</template>

<script>
import svgLoaders from "../svg-loaders.vue";

/**
 * Форма не будет работать без включенных js скриптов, так как отправкой данных занимается
 * исключительно js убивая submit браузера
 *
 * Создает форму для опроса.
 * Сами данные для опроса передаются через именные слоты
 * Картинка поясняющая шаги может менятся, для этого передается
 * массив картинок и они делят между собой шаги. Так если колличество картинок
 * и шагов одинаковое то на каждом новом шаге будет менятся картинка.
 * Перед тем как совершить переход к новому шагу валидируются все поля
 * на данном шаге (input и textarea), при этом шаг назад совершаерся без валидации
 * и всегда возможен.
 *
 * Параметр step.order используется для динамического именования слотов
 *
 * @param {Array} picture массив картинок отображаемый слева
 * @param {String} header общий заголовок для всего визарда
 * @param {Array} steps инфа для слотов
 * @param {Number} steps.order
 * @param {String} steps.header
 * @requires v-icon для удобного использования набора иконок
 * @requires svgLoaders для отображения анимации пока отправляются данные
 */
const wizard = {
  name: "wizard",
  data: () => {
    return {
      /** @property {Number} текущий шаг */
      order: 0,
      /** @property {Number}  текущий номер картинки */
      imageNumber: 0,
      /** @property {Number}  на сколько шагов одна картинка */
      stepDelta: 0,
      /** @property {Number}  счетчик с которым
       //сравнивается какая сейчас должна быть картинка */
      stepImageSeparator: 0,
      /** @property {Boolen}  флаг отображаемости загрузчика */
      loader: false
    };
  },
  components: {
    "svg-loaders": svgLoaders
  },
  props: {
    picture: {
      type: Array
    },
    header: {
      type: String,
      default: ""
    },
    steps: {
      type: Array,
      default: [
        {
          order: 0,
          header: ""
        }
      ]
    }
  },
  computed: {
    /**
     * Задает ширину для прогресс бара через инлайновый стиль
     */
    progressBgWidth() {
      return `${100 * ((this.order + 1) / this.steps.length)}%`;
    }
  },
  methods: {
    /**
     * Валидация полей на текущем шаге
     * @param {Boolean} action true === 'next' т.е. шаг вперед
     */
    validate(action) {
      const changeStep = (action, validFlag) => {
        if (!action) return this.order--;
        else if (action && validFlag) {
          this.order++;
          this.imageIterator();
        };
      };
      const isValid = elem => {
        return elem.reportValidity();
      };
      /* Выбираю все инпуты в рамках одного шага и они валидируются */
      const step = this.$el.querySelector(`#wizard--step-${this.order}`);
      const stepInputs = [...step.getElementsByTagName("input")];
      const stepArea = [...step.getElementsByTagName("textarea")];
      const validFlag = stepInputs.every(isValid) && stepArea.every(isValid);
      changeStep(action, validFlag);
    },
    /**
     * Делит колличество изображений между всеми шагами так чтобы
     * каждое занимало примерно равное кол-во шагов
     */
    imageIterator() {
      const img = this.$el.querySelector(`#wizard--picture--img`);
      const imageSetLength = this.picture.length;
      if (this.order < this.stepImageSeparator) return "";
      if (
        this.order > this.stepImageSeparator &&
        imageSetLength <= this.imageNumber
      ) {
        this.stepImageSeparator = this.stepImageSeparator + this.stepDelta;
        this.imageNumber++;
        img.src = this.picture[this.imageNumber];
      }
    }
  },
  created() {
    this.stepDelta = (this.steps.length - 1) / this.picture.length;
    this.stepImageSeparator = this.stepDelta;
  }
};
export default wizard;
</script>

<style lang='less'>
@import "../../assets/css/components/wizard.less";
</style>
