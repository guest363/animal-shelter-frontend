<template>
  <label class="common-input--wrapper">
    <input
      class="common-input"
      @keypress.enter.prevent
      @keyup.enter="onEnterAction()"
      @keydown.down="autocomplete('down')"
      @keydown.up="autocomplete('up')"
      v-on:input="dispatch($event.target.value)"
      v-on:change="emit($event.target.value)"
      v-if="type !== 'textarea'"
      v-bind="$props"
    >
    <ul class="autocomplete--results" v-show="suggestion.show" v-if="dadataType !== null">
      <li
        class="autocomplete--result"
        v-on:click="autocomplete('select', result)"
        v-for="(result, i) in suggestion.answer.data.suggestions"
        :key="i"
        :class="{ 'is-active': i === suggestion.arrowCounter }"
      >{{result.value}}</li>
    </ul>
    <slot :name="`icon`"></slot>
    <textarea
      v-if="type === 'textarea'"
      class="common-input"
      @keypress.enter.prevent
      @keyup.enter="onEnterAction()"
      v-on:change="$emit('input', $event.target.value)"
      v-bind="$props"
    ></textarea>
    <span class="common-input--label">{{textLabel}}</span>
  </label>
</template>

<script>
import Cleave from "cleave.js";
import "cleave.js/dist/addons/cleave-phone.ru.js";
import dadata from "../../assets/js/support/dadataSugestion.js";
import trottle from "../../assets/js/support/trottle.js";

const input = {
  name: "custom-input",
  data: () => {
    return {
      suggestion: {
        show: false,
        answer: {
          data: {
            suggestions: []
          }
        },
        arrowCounter: -1,
        value: ""
      }
    };
  },
  props: {
    textLabel: String,
    onEnter: {
      type: Function,
      default: null
    },
    dadataType: {
      type: String,
      default: null
    },
    value: "",
    placeholder: String,
    pattern: String,
    rows: String,
    max: String,
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * При помощи Cleave.js автоматически форматирует вводимую информацию
     * https://nosir.github.io/cleave.js/
     * @param {object} obj - параметри смотреть по ссылке
     */
    formatter: {
      type: Object,
      default() {
        return {};
      }
    },
    maxlength: {
      default: 500
    },
    cols: String,
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text",
      validator: function(value) {
        return [
          "text",
          "number",
          "password",
          "email",
          "tel",
          "url",
          "textarea"
        ].indexOf(value) !== -1
          ? true
          : console.error(
              `Параметры могут быть только "text", "number", "tel", "password" ,"email", "url" или "textarea"`
            );
      }
    }
  },
  methods: {
    getFromDaData: trottle(async function() {
      const result = await dadata(this.suggestion.value, this.dadataType);
      this.suggestion.answer = result;
    }, 1000),
    /* Если слушать событие input то будут проблемы с проверкой типа
     средствами html5, любые значения будут проходить. При прослушке
     события change такой ошибки нет и мы используем валидацию html5 */
    emit(value) {
      this.$emit("input", value);
    },
    dispatch(value) {
      if (this.dadataType !== null) {
        this.suggestion.value = value;
        this.$emit("input", value);
        this.autocomplete("input");
      }
    },
    onEnterAction() {
      if (this.dadataType !== null && this.suggestion.show === true) {
        this.autocomplete("enter");
      } else if (this.onEnter !== null) this.onEnter();
    },
    autocomplete(action = "default", data = null) {
      const actions = {
        input: () => {
          this.getFromDaData(this.dadataType);
          this.suggestion.show = true;
        },
        select: () => {
          this.suggestion.value = data.value;
          this.suggestion.show = false;
          this.suggestion.arrowCounter = -1;
          this.$emit("input", this.suggestion.value);
        },
        enter: () => {
          this.suggestion.value = this.suggestion.answer.data.suggestions[
            this.suggestion.arrowCounter
          ].value;
          this.suggestion.show = false;
          this.suggestion.arrowCounter = -1;
          this.$emit("input", this.suggestion.value);
        },
        up: () => {
          this.suggestion.arrowCounter > 0
            ? this.suggestion.arrowCounter--
            : "";
        },
        down: () => {
          this.suggestion.arrowCounter <
          this.suggestion.answer.data.suggestions.length
            ? this.suggestion.arrowCounter++
            : "";
        }
      };
      actions[action]();
    }
  },
  mounted() {
    const input = this.$el.getElementsByTagName("input")[0];
    if (input !== void 0 && this.formatter !== void 0) {
      new Cleave(input, this.formatter);
    }
  }
};
export default input;
</script>

<style lang='less'>
@import "../../assets/css/components/input.less";
</style>
