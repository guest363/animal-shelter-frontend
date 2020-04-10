<template>
  <div class="wrapper--layouts">
    <div class="registry content-wrapper">
      <img
        class="registry--close"
        :src="closeIcon"
        @click="$router.push('/')"
        alt="Иконка закрытия окна"
      />
      <custom-wizard
        class="registry--box"
        :steps="wizardSteps"
        :picture="pictureSet"
        :header="`Анкета для ищущего друга`"
        v-on:submit="add"
      >
        <template #0>
          <div class="registry--box--text">
            <p>Анкета-опросник для желающих приютить питомца</p>
            <p>Заполненная анкета поможет:</p>
            <ol>
              <li>
                Вам - лучше понять готовы ли вы приютить у себя питомца
                ясно осознавая возможные трудности
              </li>
              <li>Нам - понять насколько серьезно вы настроены</li>
            </ol>

            <p>
              Мы хотим чтобы каждое спасенное нами
              животное оказалось в самых лучших, надежных и любящих руках и
              чтобы его судьба устроилась наилучшим образом.
            </p>
            <p>
              Мы хотим, чтобы вы получили удовольствие от общения с вашим новым
              питомцем, а наши подопечные навсегда обрели свой дом и своего хозяина.
            </p>
            <p>Пожалуйста, ответьте максимально честно на все вопросы.</p>
          </div>
        </template>
        <!-- Общие сведения о вас -->
        <template #1>
          <div class="registry--box--text">
            <custom-input
              :textLabel="`ФИО`"
              :placeholder="`Иванов Иван Иванович`"
              :maxlength="`90`"
              :required="true"
              v-model="anketa.fio"
              :type="`text`"
            />
            <custom-input
              :textLabel="`Ваш возраст`"
              :placeholder="`22`"
              :max="`120`"
              :required="true"
              v-model="anketa.age"
              :type="`number`"
            />
            <custom-input
              :textLabel="`Номер телефона`"
              v-model="anketa.phone"
              :required="true"
              :placeholder="`9xx xxx xx xx (только мобильный номер телефона)`"
              :pattern="`[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}`"
              :type="`tel`"
              :maxlength="`13`"
              :formatter="{phone: true, phoneRegionCode: 'RU'}"
            />
            <custom-input
              :textLabel="`Эллектронная почта`"
              v-model="anketa.email"
              :placeholder="`test@mail.ru`"
              :type="`email`"
            />
            <custom-input
              :textLabel="`Город проживания`"
              v-model="anketa.city"
              :placeholder="`Москва`"
              :type="`text`"
              :dadataType="`city`"
            />
            <custom-input
              :textLabel="`Профиль в социальной сети`"
              v-model="anketa.social"
              :placeholder="`https://vk.com/idXXXXXXXX`"
              :type="`url`"
            />
          </div>
        </template>
        <!-- Расскажите о ваших бывших питомцах -->
        <template #2>
          <div class="registry--box--text">
            <custom-icon-select
              @select="anketa.oldAnimal = $event"
              :header="'Какие домашние животные были у вас в прошлом?'"
              :type="`oldAnimal`"
            />
            <span
              class="input--radio--header"
            >Умирали ли ваши животные от болезней или по другой причине?</span>
            <custom-input
              :textLabel="`Причина`"
              v-model="anketa.deathHistory"
              :placeholder="`Нет, не умирали`"
              :type="`textarea`"
              :rows="`5`"
            />
          </div>
        </template>

        <!-- Какие у вас сейчас есть питомцы? -->
        <template #3>
          <div class="registry--box--text">
            <custom-icon-select
              @select="anketa.presentAnimalFlag = $event"
              :header="'Какие домашние животные есть у вас сейчас?'"
              :type="`oldAnimal`"
            />

            <!-- Заполнение при наличии животного -->
            <div class="anketa--ways">
              <div class="anketa--ways--route">
                <div
                  :class="anketa.presentAnimalFlag === 'CAT' ||
                    anketa.presentAnimalFlag === `ALL`
                    ? `anketa--ways--route--enablade`
                    : `anketa--ways--route--disabled`"
                ></div>
                <h4>Кошка</h4>
                <custom-input
                  :textLabel="`Возраст`"
                  :max="`20`"
                  v-model="anketa.presentCat.age"
                  :type="`number`"
                  :disabled="anketa.presentAnimalFlag !== 'CAT' &&
                    anketa.presentAnimalFlag !== `ALL`"
                />
                <!-- Пол -->
                <custom-icon-select
                  @select="anketa.presentCat.sex = $event"
                  :header="'Пол:'"
                  :type="`sex`"
                />
              </div>

              <div class="anketa--ways--route">
                <div
                  :class="anketa.presentAnimalFlag === 'DOG' ||
                    anketa.presentAnimalFlag === `ALL`
                    ? `anketa--ways--route--enablade`
                    : `anketa--ways--route--disabled`"
                ></div>
                <h4>Собака</h4>
                <custom-input
                  :textLabel="`Возраст`"
                  :max="`20`"
                  v-model="anketa.presentDog.age"
                  :type="`number`"
                  :disabled="anketa.presentAnimalFlag !== 'DOG' &&
                    anketa.presentAnimalFlag !== `ALL`"
                />
                <!-- Пол -->
                <custom-icon-select
                  @select="anketa.presentDog.sex = $event"
                  :header="'Пол:'"
                  :type="`sex`"
                />
              </div>
            </div>
            <custom-icon-select
              @select="anketa.animalIsFor.sex = $event"
              :header="'Для чего вы хотите взять питомца, себя или как компаньона для других животных?'"
              :type="`forWhat`"
            />
          </div>
        </template>
        <!-- Расскажите о ваших детях и условиях проживания -->
        <template #4>
          <div class="registry--box--text">
            <custom-icon-select
              @select="anketa.children.flag = $event"
              :header="'Есть ли у вас дети?'"
              :type="`yesNo`"
            />

            <div class="anketa--ways">
              <div class="anketa--ways--route">
                <div
                  :class="anketa.children.flag  !== 'false' && anketa.children.flag  !== null ? `anketa--ways--route--enablade` : 'anketa--ways--route--disabled'"
                ></div>
                <h4>Самый маленький ребенок</h4>
                <custom-input
                  :textLabel="`Возраст`"
                  :max="`120`"
                  :disabled="anketa.children.flag  === 'false' || anketa.children.flag  === null"
                  v-model="anketa.children.age"
                  :type="`number`"
                />
              </div>
            </div>
            <custom-icon-select
              @select="anketa.apartment.owner = $event"
              :header="'Вы проживаете в собственном доме или квартире?'"
              :type="`yesNo`"
            />
          </div>
        </template>
        <!-- Вопросы содержания нового питомца -->
        <template #5>
          <div class="registry--box--text">
            <span
              class="input--radio--header"
            >Если вы уедете на несколько дней, например в отпуск, кто будет заботиться о питомце?</span>
            <custom-input
              :textLabel="`Скорее всего`"
              v-model="anketa.petQuestions.vocation"
              :placeholder="`Возьму с собой или отдам в гостиницу для животных`"
              :type="`textarea`"
              :rows="`5`"
            />
            <custom-icon-select
              @select="anketa.petQuestions.sterilization = $event"
              :header="'Как вы относитесь к кастрации, стерелизации?'"
              :type="`sterilization`"
            />
            <span
              class="input--radio--header"
            >При каких обстоятельствах вы не будете в состоянии держать питомца?</span>
            <custom-input
              :textLabel="`Для меня причиной будет`"
              v-model="anketa.petQuestions.leave"
              :placeholder="`(Примеры:) Беременность, развод, аллергия у детей, потеря работы, смена работы, намеченный переезд, царапины на мебели и ковре, ветеринарные счета, конфликты с другими домашними животными, возравозраст питомца, свой вариант.`"
              :type="`textarea`"
              :rows="`8`"
            />
            <custom-icon-select
              @select="anketa.apartment.balcony = $event"
              :header="`Есть ли у вас балкон или лоджия?`"
              :type="`yesNo`"
            />
          </div>
        </template>
        <!-- Вопросы содержания нового питомца ч. 2-->
        <template #6>
          <div class="registry--box--text">
            <span
              class="input--radio--header"
            >Что вы знаете о вакцинации (прививках)? Если прививались, то какими вакцинами? Что вообще думаете об этом?</span>
            <custom-input
              :textLabel="`Давайте по порядку`"
              v-model="anketa.petQuestions.vaccinating"
              :placeholder="`Знаю что нужно делать какие-то вакцины. Раньше не вакцинировал. Вакцинировать надо`"
              :type="`textarea`"
              :rows="`8`"
            />
            <custom-icon-select
              @select="anketa.petQuestions.tickTreatmenting = $event"
              :header="`Собираетесь регулярно обрабатывать животное от клещей?`"
              :type="`yesNo`"
            />
            <span class="input--radio--header">Чем собираетесь кормить животное?</span>
            <custom-input
              :textLabel="`Думаю это будет`"
              v-model="anketa.petQuestions.diet"
              :placeholder="`Планирую кормить натуральной едой`"
              :type="`textarea`"
              :rows="`8`"
            />
          </div>
        </template>

        <!-- Общение -->
        <template #7>
          <div class="registry--box--text">
            <custom-icon-select
              @select="anketa.communication.visit = $event"
              :header="`Готовы ли вы пригласить нас к себе в гости, чтобы показать условия содержания будущего животного?`"
              :type="`yesNo`"
            />
            <span class="input--radio--header">Чем собираетесь кормить животное?</span>
            <custom-input
              :textLabel="`Думаю это будет`"
              v-model="anketa.petQuestions.diet"
              :placeholder="`Планирую кормить натуральной едой`"
              :type="`textarea`"
              :rows="`8`"
            />
          </div>
        </template>
      </custom-wizard>
      <custom-alert :text="dataForModal.text" :header="dataForModal.header"></custom-alert>
    </div>
  </div>
</template>

<script>
/* TODO: при переходе на эту анкету с конкретного животного
        слева должна отображаться его фото 
    TODO: анкета должна подходить как кошкам так и собакам*/
import axios from "axios";
import dadataOrgInfo from "../assets/js/support/dadataOrgInfo.js";
import closeModalMixin from "../plugins/mixin/close-modal-mixin.js";

const anketa = {
  name: "anketa",
  mixins: [closeModalMixin],
  data: () => {
    return {
      anketa: {
        fio: null,
        age: null,
        phone: null,
        email: null,
        city: null,
        social: null,
        oldAnimal: null,
        presentAnimalFlag: null,
        presentCat: {
          species: "CAT",
          age: null,
          sex: null
        },
        presentDog: {
          species: "DOG",
          age: null,
          sex: null
        },
        deathHistory: null,
        animalIsFor: null,
        children: {
          flag: null,
          age: null
        },
        apartment: {
          owner: null,
          balcony: null
        },
        petQuestions: {
          vocation: null,
          leave: null,
          sterilization: null,
          vaccinating: null,
          tickTreatmenting: null,
          diet: null
        },
        communication: {
          visit: null
        }
      },
      closeIcon: require(`../static/common-icon/close.svg`),
      pictureSet: [require(`../assets/img/stock/registry-med-2.jpg`)],
      wizardSteps: [
        {
          order: 0,
          header: "Что за анкета?"
        },
        {
          order: 1,
          header: "Общие сведения о вас"
        },
        {
          order: 2,
          header: "Расскажите о ваших бывших питомцах"
        },
        {
          order: 3,
          header: "Какие у вас сейчас есть питомцы?"
        },
        {
          order: 4,
          header: "Расскажите о ваших детях и условиях проживания"
        },
        {
          order: 5,
          header: "Вопросы содержания нового питомца"
        },
        {
          order: 6,
          header: "Вопросы содержания нового питомца ч.2"
        },
        {
          order: 7,
          header: "Дальнейшее общение"
        }
      ],
      dataForModal: {
        text: "",
        header: "Результат"
      }
    };
  },
  methods: {
    add() {}
  },
  mounted() {}
};
export default anketa;
</script>

<style lang='less' scoped>
@import "../assets/css/layout/anketa.less";
@import "../assets/css/layout/registry.less";
</style>
