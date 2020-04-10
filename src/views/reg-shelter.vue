<template>
  <div class="wrapper--layouts">
    <div class="registry content-wrapper">
      <img
        class="registry--close"
        :src="closeIcon"
        @click="$router.push('/')"
        alt="Иконка закрытия окна"
      >
      <custom-wizard
        class="registry--box"
        :steps="wizardSteps"
        :picture="pictureSet"
        :header="`Регистрация нового приюта`"
        v-on:submit="add"
      >
        <template #0>
          <div class="registry--box--text">
            <p>
              Мы альтруисты и создали этот сервис чтобы помочь любому приюту
              в их работе по спасению домашних животных.
            </p>
            <p>Бесплатно сейчас и всегда</p>
            <p>
              <b>Если кратко, вот чем приюту может помочь данный сервис:</b>
            </p>
            <ol>
              <li>Создать базу животных чтобы им было проще найти новый дом</li>
              <li>Собирать пожертвования на нужды приюта</li>
              <li>Находить волонтеров</li>
            </ol>
            <p>
              После регистрации и проверки предоставленной информации
              вам будет доступен личный
              кабинет вледельца приюта
            </p>
          </div>
        </template>

        <template #1>
          <div class="registry--box--text" @click="prev($event)">
            <p>Для начала выберите приют на карте.</p>
            <custom-input
              :textLabel="`Выбран адрес приюта`"
              :rows="`2`"
              :required="true"
              :placeholder="newShelter.address || 'Планета Земля'"
              :disabled="true"
            />
            <div id="map" class="registry--box--map"></div>
          </div>
        </template>

        <template #2>
          <div class="registry--box--text">
            <p>
              Давайте познакомися поближе. Мы команда разработчиков из Москвы, Тюмени и Санкт-Петербурга. Подробнее про нас можно посмотреть
              <router-link to="/team">здесь.</router-link>
            </p>
            <p>Теперь пару слов про вас.</p>
            <custom-input
              :textLabel="`ФИО`"
              :placeholder="`Иванов Иван Иванович`"
              :maxlength="`90`"
              :required="true"
              v-model="newShelter.ownerFIO"
              :type="`text`"
            />
            <custom-input
              :textLabel="`Номер телефона`"
              v-model="newShelter.phone"
              :required="true"
              :placeholder="`9xx xxx xx xx (только мобильный номер телефона)`"
              :pattern="`[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}`"
              :type="`tel`"
              :formatter="{phone: true, phoneRegionCode: 'RU'}"
            />
            <custom-input
              :textLabel="`Эллектронная почта`"
              v-model="newShelter.email"
              :required="true"
              :placeholder="`test@mail.ru`"
              :type="`email`"
            />
            <p>
              Придумайте себе логин и пароль.
              <br>Пароль можно сгенерировать случайным образом.
            </p>
            <custom-input
              :textLabel="`Логин`"
              :placeholder="`kiril9029`"
              :required="true"
              :maxlength="`20`"
              v-model="newShelter.username"
              :type="`text`"
            ></custom-input>
            <custom-input
              :textLabel="`Пароль`"
              :required="true"
              :placeholder="'Пароль должен быть сложным'"
              :maxlength="`30`"
              v-model="newShelter.password"
              :type="`text`"
            >
              <template #icon>
                <button
                  v-tooltip="'Сгенерировать случайный пароль'"
                  class="common--button common-input--icon--wrapper"
                  @click.prevent="generatePassword"
                >
                  <v-icon class="common-input--icon" name="random"/>
                </button>
              </template>
            </custom-input>
          </div>
        </template>

        <template #3>
          <div class="registry--box--text">
            <p>
              В свободной форме расскажите о своем приюте.
              Эта информация будет отображаться на вашей станице о приюте.
              Доступно форматирвоание текса.
            </p>
            <custom-input
              :textLabel="`Описание приюта`"
              :rows="`20`"
              :placeholder="`Пару слов о приюте`"
              v-model="newShelter.description"
              :type="`textarea`"
              :maxlength="`800`"
            />
          </div>
        </template>

        <template #4>
          <div class="registry--box--text">
            <p>
              Сервис предназначен, в частности, для помощи приютам в сборе
              пожертвований. Чтобы исключить факт мошенничества мы просим вас предоставить эту информацию.
            </p>
            <ul>
              <li>Если у приюта нет статуса НКО прикрепите фотографию паспорта владельца</li>
              <li>Для НКО свидетельство о регистрации</li>
            </ul>
            <!-- <p>Для физических лиц указывать ИНН не нужно.</p> -->
            <custom-input
              :textLabel="`ИНН приюта`"
              :placeholder="`1234567891`"
              :pattern="`[0-9]{10}`"
              :max="`9999999999`"
              v-model="newShelter.inn"
              :type="`number`"
            >
              <template #icon>
                <button
                  v-tooltip="'Посмотреть информацию из открытых источников по ИНН'"
                  class="common--button common-input--icon--wrapper"
                  @click.prevent="showOrgInfo"
                >
                  <v-icon class="common-input--icon" name="regular/question-circle" label="Вперед"/>
                </button>
              </template>
            </custom-input>

            <drag-and-drop
              v-on:dropImage="imageHendler('SHELTER', $event)"
              class="registry--box--dnd"
              ref="dnd"
              :data="dataForDNDPasport"
            ></drag-and-drop>
          </div>
        </template>

        <template #5>
          <div class="registry--box--text">
            <p>
              Сейчас для вас будет небольшое задание. Его выполнение не займет больше
              5 минут, но покажет серьезность ваших намерений.
            </p>
            <p>Прикрепите 2 фотографии.</p>
            <ol>
              <li>Селфи на фоне вольеров с животными</li>
              <li>
                Отедльно
                вольер с животным
              </li>
            </ol>

            <drag-and-drop
              v-on:dropImage="imageHendler('OWNER', $event)"
              class="registry--box--dnd"
              ref="dnd"
              :data="dataForDNDPhoto"
            ></drag-and-drop>
          </div>
        </template>

        <template #6>
          <div class="registry--box--text">
            <p>Последний шаг. Добавьте ссылки на аккаунт приюта в разных социальных сетях.</p>
            <custom-input
              :textLabel="`Инстаграмм`"
              :maxlength="`200`"
              :placeholder="`https://www.instagram.com/XXXXXXXXXX/?hl=ru`"
              v-model="newShelter.instagram"
              :type="`url`"
            />
            <custom-input
              :maxlength="`200`"
              :placeholder="`https://vk.com/XXXXXXXX`"
              :textLabel="`Вконтакте`"
              v-model="newShelter.vk"
              :type="`url`"
            />
            <custom-input
              :maxlength="`200`"
              :placeholder="`https://ok.ru/profile/XXXXXXXX`"
              :textLabel="`Однокласники`"
              v-model="newShelter.ok"
              :type="`url`"
            />
            <custom-input
              :maxlength="`200`"
              :placeholder="`https://fb.com/profile/XXXXXXXX`"
              :textLabel="`Facebook`"
              v-model="newShelter.fb"
              :type="`url`"
            />
          </div>
        </template>
      </custom-wizard>
      <custom-alert :text="dataForModal.text" :header="dataForModal.header"></custom-alert>
    </div>
  </div>
</template>

<script>
import dnd from "../components/dnd.vue";
import { setTimeout } from "timers";
import axios from "axios";
import yampInit from "../assets/js/support/yampFind.js";
import dadataOrgInfo from "../assets/js/support/dadataOrgInfo.js";
import closeModalMixin from "../plugins/mixin/close-modal-mixin.js";

const registry = {
  name: "registry",
  mixins: [closeModalMixin],
  data: () => {
    return {
      /* TODO: И еще я понял что нигде нет названия приюта. Еще добавлю поле shelterName
        TODO: проверить чекается ли приют без клика по кнопке 
        TODO: добавить редактор quill в поле описание приюта*/
      newShelter: {
        coordinates: {
          /* Они сюда пишутся напрямую из блока яндекс карт
          так как им передается экземпляр Vue, так себе решение */
          latitude: "",
          longitude: ""
        },
        description: "",
        ownerFIO: "",
        phone: "",
        email: "",
        vk: "",
        ok: "",
        fb: "",
        instagram: "",
        /* Картинки в таком виде хранятся  
        {
          "content": "string",
          "type": "OWNER, SHELTER, PASSPORT"
        } */
        images: [],
        inn: "",
        address: "",
        fullAddress: "",
        kpp: "",
        ogrn: "",
        fullName: "",
        username: "",
        password: ""
      },
      alert: {
        header: "Ошибка",
        text: ""
      },
      closeIcon: require(`../static/common-icon/close.svg`),
      pictureSet: [require(`../assets/img/stock/registry-med-2.jpg`)],
      wizardSteps: [
        {
          order: 0,
          header: "Пара слов о нас и сервисе"
        },
        {
          order: 1,
          header: "Местоположение приюта"
        },
        {
          order: 2,
          header: "Данные владельца"
        },
        {
          order: 3,
          header: "Описание приюта"
        },
        {
          order: 4,
          header: "Юридическая информация или данные данные владельца"
        },
        {
          order: 5,
          header: "Информация о приюте в открытых источниках"
        },
        {
          order: 6,
          header: "Последний шаг"
        }
      ],
      dataForModal: {
        text: "",
        header: "Информация об организации"
      },
      dataForDNDPasport: {
        show: {
          button: true,
          limits: true
        },
        text: {
          main: "",
          button: "Выбрать документы",
          limits: "Или просто перетащите их в это поле"
        }
      },
      dataForDNDPhoto: {
        show: {
          button: true,
          limits: true
        },
        text: {
          main: "",
          button: "Выбрать фотографии",
          limits: "Или просто перетащите их в это поле"
        }
      }
    };
  },
  components: {
    "drag-and-drop": dnd
  },
  computed: {
    innLength() {
      return this.newShelter.inn.length;
    }
  },
  methods: {
    generatePassword() {
      let length = 8,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        password = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
      }
      this.newShelter.password = password;
    },
    setOficialInfo(info) {
      this.newShelter.kpp = info.data.kpp;
      this.newShelter.ogrn = info.data.ogrn;
      this.newShelter.fullName = info.data.name.full_with_opf;
      this.newShelter.fullAddress = info.data.address.unrestricted_value;
      return `<p><b>Название</b> - ${info.value || "Нет данных"}</p>
            <p><b>КПП</b> - ${info.data.kpp || "Нет данных"}</p>
            <p><b>ОГРН</b> - ${info.data.ogrn || "Нет данных"}</p>
            <p><b>Полное имя</b> - ${info.data.name.full_with_opf ||
              "Нет данных"}</p>
            <p><b>Полный адрес</b> - ${info.data.address.unrestricted_value ||
              "Нет данных"}</p>
            <p><b>Телефон</> - ${info.data.phones || "Нет данных"}</p>`;
    },
    getOficialInfo(action = () => {}) {
      return dadataOrgInfo(this.newShelter.inn)
        .then(response => {
          const info = response.data.suggestions[0] || false;
          this.dataForModal.text = info
            ? this.setOficialInfo(info)
            : "Нет данных, скорее всего вы ошиблись в ИНН";
          action();
        })
        .catch(error => {
          console.log("getOficialInfo");
          this.dataForModal.text = `Ошибка ${error}`;
          action();
        });
    },
    showOrgInfo() {
      const inn = this.newShelter.inn;
      if (this.innLength !== 10) {
        this.dataForModal.text = `ИНН организации состоит из 10 цифр <br> Для физ. лица указывать его нет нужды`;
        this.$modal.show("custom-alert");
        return;
      }
      this.getOficialInfo(() => {
        this.$modal.show("custom-alert");
      });
    },
    imageHendler(type, obj) {
      const vm = this;
      const pushImage = (typeToDB = type) => {
        vm.newShelter.images.push({
          content: obj,
          type: typeToDB
        });
      };
      if (type === "SHELTER" && this.innLength !== 10) {
        pushImage("PASSPORT");
      } else {
        pushImage();
      }
    },
    prev(event) {
      event.preventDefault();
    },
    add() {
      this.newShelter.kpp === "" ? this.getOficialInfo() : "";
      this.$shelter()
        .addShelterRequest(this.newShelter)
        .then(response => {
          this.dataForModal.text = response.status;
          this.$modal.show("custom-alert");
        })
        .catch(error => {
          this.dataForModal.text = `Ошибка ${error}`;
          this.$modal.show("custom-alert");
        });
    },
  },
  mounted() {
    const VM = this;
    yampInit(VM);
  }
};
export default registry;
</script>

<style lang='less' scoped>
@import "../assets/css/layout/registry.less";
</style>
