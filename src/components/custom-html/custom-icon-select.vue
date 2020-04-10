<template>
  <div>
    <div class="input--radio--wrapper" v-if="format === 'Column'">
      <span class="input--radio--header">{{header}}</span>
      <div class="input--radio--icons">
        <div v-for="item in sets[type]" v-bind:key="item.value">
          <div
            class="input--radio--icons--text"
            v-tooltip="item.tooltip"
            @click="select(item.value)"
          >
            <v-icon
              class="check-icon"
              :style="(activeFeild === item.value) ? `color: ${item.color}` : 'color: var(--grey);'"
              :name="item.icon"
              :label="item.iconLabel || ''"
            />
            <div class="input--radio--icons--text--label">{{item.text || ''}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="input--radio--wrapper__line" v-if="format === 'Line'">
      <span class="input--radio--header">{{header}}</span>
      <div v-for="item in sets[type]" v-bind:key="item.value">
        <div
          class="input--radio--wrapper__line--text"
          v-tooltip="item.tooltip"
          @click="select(item.value)"
        >
          <v-icon
            class="check-icon"
            :style="(activeFeild === item.value) ? `color: ${item.color}` : 'color: var(--grey);'"
            :name="item.icon"
            :label="item.iconLabel || ''"
          />
          <div class="input--radio--icons--text--label">{{item.text || ''}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const iconSelect = {
  name: "custom-icon-select",
  data: () => {
    return {
      activeFeild: "",
      sets: {
        oldAnimal: [
          {
            value: "CAT",
            tooltip: "Кошка",
            icon: "cat",
            iconLabel: "Кошка",
            text: "Кошка",
            color: "var(--green-light)"
          },
          {
            value: "DOG",
            tooltip: "Собака",
            icon: "dog",
            iconLabel: "Собака",
            text: "Собака",
            color: "var(--orange)"
          },
          {
            value: "ALL",
            tooltip: "И кошка и собака",
            icon: "paw",
            iconLabel: "Лапа",
            text: "Оба",
            color: "var(--green)"
          },
          {
            value: "false",
            tooltip: "Без животных",
            icon: "regular/times-circle",
            iconLabel: "Крестик в круге",
            text: "Нет питомцев",
            color: "var(--orange-dark)"
          }
        ],
        sex: [
          {
            value: "MALE",
            tooltip: "Мужской",
            icon: "mars",
            iconLabel: "Мужской символ",
            text: "",
            color: "var(--blue)"
          },
          {
            value: "FEMALE",
            tooltip: "Женский",
            icon: "venus",
            iconLabel: "Женский символ",
            text: "",
            color: "var(--pink)"
          }
        ],
        catOrDog: [
          {
            value: "CAT",
            tooltip: "Кошка",
            icon: "cat",
            iconLabel: "Кошка",
            text: "",
            color: "var(--orange)"
          },
          {
            value: "DOG",
            tooltip: "Собака",
            icon: "dog",
            iconLabel: "Собака",
            text: "",
            color: "var(--green)"
          }
        ],
        forWhat: [
          {
            value: "SELF",
            tooltip: "Себе",
            icon: "regular/grin-hearts",
            iconLabel: "Лицо с сердечками вместо глаз",
            text: "Себе",
            color: "var(--green)"
          },
          {
            value: "PET",
            tooltip: "Моим питомцам нужен компаньен",
            icon: "dog",
            iconLabel: "Собака",
            text: "Для питомцев",
            color: "var(--orange)"
          }
        ],
        yesNo: [
          {
            value: "true",
            tooltip: "Да",
            icon: "regular/check-circle",
            iconLabel: "Галка в круге",
            text: "Да",
            color: "var(--green)"
          },
          {
            value: "false",
            tooltip: "Нет",
            icon: "regular/times-circle",
            iconLabel: "Крестик в круге",
            text: "Нет",
            color: "var(--orange)"
          }
        ],
        sterilization: [
          {
            value: "POSITIVE",
            tooltip: "За стерилизацию",
            icon: "regular/grin-hearts",
            iconLabel: "Лицо с сердечками вместо глаз",
            text: "Сторонник",
            color: "var(--green)"
          },
          {
            value: "NEUTRAL",
            tooltip: "Решению буду принимать по обстоятельствам",
            icon: "regular/meh",
            iconLabel: "Нейтральное лицо",
            text: "Колеблюсь",
            color: "var(--orange)"
          },
          {
            value: "NEGATIVE",
            tooltip: "Негативно, стерилизовать своего питомца не стану",
            icon: "regular/grimace",
            iconLabel: "Агресивное лицо",
            text: "Негативно",
            color: "var(--orange-dark)"
          },
          {
            value: "unknown",
            tooltip: "Не знаю, никогда об этом не думал",
            icon: "regular/question-circle",
            iconLabel: "Вопрос в круге",
            text: "Не знаю",
            color: "var(--black)"
          }
        ],
        isVaccinated: [
          {
            value: "true",
            tooltip: "Пройдена",
            icon: "regular/check-circle",
            color: "var(--green)"
          },
          {
            value: "false",
            tooltip: "Непройдена",
            icon: "regular/times-circle",
            color: "var(--orange-dark)"
          }
        ],
        isSterilized: [
          {
            value: "true",
            tooltip: "Пройдена",
            icon: "regular/check-circle",
            color: "var(--green)"
          },
          {
            value: "false",
            tooltip: "Непройдена",
            icon: "regular/times-circle",
            color: "var(--orange-dark)"
          },
          {
            value: "unknown",
            tooltip: "Неизвестно",
            icon: "regular/question-circle",
            color: "var(--black)"
          }
        ],
        trueFalseUnknown: [
          {
            value: "true",
            tooltip: "Да",
            icon: "regular/check-circle",
            color: "var(--green)"
          },
          {
            value: "false",
            tooltip: "Нет",
            icon: "regular/times-circle",
            color: "var(--orange-dark)"
          },
          {
            value: "unknown",
            tooltip: "Неизвестно",
            icon: "regular/question-circle",
            color: "var(--black)"
          }
        ],
        attitude: [
          {
            value: "POSITIVE",
            tooltip: "Позитивное",
            icon: "regular/grin-hearts",
            color: "var(--green)"
          },
          {
            value: "NEUTRAL",
            tooltip: "Нейтральное",
            icon: "regular/meh",
            color: "var(--orange)"
          },
          {
            value: "NEGATIVE",
            tooltip: "Негативно",
            icon: "regular/grimace",
            color: "var(--orange-dark)"
          },
          {
            value: "unknown",
            tooltip: "Неизвестно",
            icon: "regular/question-circle",
            color: "var(--black)"
          }
        ],
        temperament: [
          {
            value: "EXTRAACTIVE",
            tooltip: "Очень активный",
            icon: "angle-double-up",
            color: "var(--green)"
          },
          {
            value: "ACTIVE",
            tooltip: "Активный",
            icon: "minus",
            color: "var(--orange)"
          },
          {
            value: "NEUTRAL",
            tooltip: "Спокойны",
            icon: "regular/grimace",
            color: "var(--orange-dark)"
          },
          {
            value: "LAZY",
            tooltip: "Ленивый",
            icon: "angle-down",
            color: "var(--black)"
          }
        ]
      }
    };
  },
  props: {
    header: String,
    type: String,
    format: {
      type: String,
      default: "Column"
    }
  },
  methods: {
    select(value) {
      this.activeFeild = value;
      this.$emit("select", value);
    }
  },
  mounted() {}
};
export default iconSelect;
</script>

<style lang='less'>
</style>
