<template>
  <div class="add-item">
    <div class="loader" v-show="loader">
      <loader></loader>
    </div>
    <div class="add-content">
      <input class="admin-panel--input" type="text" v-model="pet.name" placeholder="Имя" />
      <!-- Вид -->
      <custom-icon-select
        @select="pet.species = $event"
        :header="'Вид:'"
        :type="`catOrDog`"
        :format="'Line'"
      />
      <!-- Пол -->
      <custom-icon-select
        :format="'Line'"
        @select="pet.sex = $event"
        :header="'Пол:'"
        :type="`sex`"
      />
      <!-- Вакцинация -->
      <custom-icon-select
        @select="pet.vaccinated = $event"
        :header="'Вакцинация:'"
        :type="`isVaccinated`"
        :format="'Line'"
      />
      <!-- Стерилизация -->
      <custom-icon-select
        @select="pet.sterilized = $event"
        :header="'Стерилизация:'"
        :type="`isSterilized`"
        :format="'Line'"
      />

      <!-- Приучен к туалету -->
      <custom-icon-select
        @select="pet.houseTrained = $event"
        :header="'Приучен к туалету:'"
        :type="`trueFalseUnknown`"
        :format="'Line'"
      />

      <!-- Отношение к детям -->
      <custom-icon-select
        @select="pet.attitudeToChildren = $event"
        :header="'Отношение к детям:'"
        :type="`attitude`"
        :format="'Line'"
      />

      <!-- Отношение к другим животным -->
      <custom-icon-select
        @select="pet.attitudeToAnimal = $event"
        :header="'Отношение к другим животным:'"
        :type="`attitude`"
        :format="'Line'"
      />
      <!-- Темперамент -->
      <custom-icon-select
        @select="pet.temperament = $event"
        :header="'Темперамент:'"
        :type="`temperament`"
        :format="'Line'"
      />

      <!-- Дата поступления в приют -->
      <datepicker
        input-class="admin-panel--input"
        :full-month-name="true"
        :language="languages['ru']"
        placeholder="Дата поступления в приют"
        v-model="pet.entryDate"
      ></datepicker>
      <!-- Вес -->
      <input
        class="admin-panel--input"
        type="number"
        v-model="pet.weight"
        placeholder="Вес, примерно"
      />
      <!-- Возраст -->
      <input
        class="common-input admin-panel--input"
        type="number"
        v-model="pet.age"
        placeholder="Возраст, примерно"
      />
      <!-- История животного -->
      <textarea
        v-model="pet.story"
        class="admin-panel--input"
        placeholder="История животного"
        cols="30"
        rows="5"
      ></textarea>

      <button
        class="common--button admin-panel--buttomn"
        @click="add"
        type="submit"
      >Добавить в каталог</button>
      <button class="common--button admin-panel--buttomn" @click="clear" type="submit">Очистить</button>

      <custom-alert :text="dataForModal.text"></custom-alert>
    </div>
    <drag-and-drop class="add-item--animal-img" ref="dnd" :data="dataForDND"></drag-and-drop>
  </div>
</template>



<script>
/* нужна функция translate */

import dnd from "../../../components/dnd.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";

export default {
  name: "addPet",
  components: {
    "drag-and-drop": dnd,
    Datepicker
  },
  data: () => {
    return {
      languages: lang,
      pet: {
        name: null,
        species: null,
        photos: [],
        thumbnails: [],
        sex: null,
        vaccinated: null,
        sterilized: null,
        houseTrained: null,
        attitudeToChildren: null,
        attitudeToAnimal: null,
        weight: null,
        age: null,
        temperament: null,
        story: null
      },
      loader: false,
      itemProp: {},
      dataForDND: {
        show: {
          button: true,
          limits: true
        },
        text: {
          main: "",
          button: "Выбрать фото животного",
          limits: "Или просто перетащите фотографию в это поле"
        },
        id: "animal"
      },
      dataForModal: {
        text: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getEditAnimal"])
  },
  methods: {
    ...mapMutations(["bookedAnimal", "setEditAnimal"]),
    ...mapActions(["setNewAnimal"]),
    showModal(data) {
      this.dataForModal.text = data;
      this.$modal.show("custom-alert");
    },
    add() {
      const getAllImages = () => {
        const imgages = document
          .getElementById(`${this.dataForDND.id}-dropZone--gallery--full`)
          .getElementsByClassName("dropImg");
        [...imgages].forEach(elem => {
          this.pet.photos.push(elem.src);
        });
        const thumbnail = document
          .getElementById(`${this.dataForDND.id}-dropZone--gallery--thumbnail`)
          .getElementsByClassName("dropImg--small");
        [...thumbnail].forEach(elem => {
          this.pet.thumbnails.push(elem.src);
        });
      };
      const validateItem = () => {
        getAllImages();
        if (this.item.photos[0] !== void 0) {
          return true;
        }
        this.showModal("Прикрепите хотябы одну фотографию животного.");
        return false;
      };
      if (validateItem() === true) {
        this.loader = true;
        this.$shelter()
          .addPet(this.pet)
          .then(
            result => {
              this.loader = false;
              this.showModal(`В базу добавлен новый зверёк ${this.pet.name}`);
              this.clear();
            },
            error => {
              this.loader = false;
              this.showModal(`Ошибка при добавлении в базу ${error}`);
            }
          );
        /*  this.bookedAnimal({ id: "10", action: "забронирован Марией" }); */
      }
    },
    clear() {
      this.pet = {};
      const delPhotoFromDND = () => {
        const imgages = document
          .getElementById(`${this.dataForDND.id}-dropZone--gallery--full`)
          .getElementsByClassName("dropImg");
        [...imgages].forEach(elem => {
          elem.remove();
        });
        const thumbnail = document
          .getElementById(`${this.dataForDND.id}-dropZone--gallery--thumbnail`)
          .getElementsByClassName("dropImg--small");
        [...thumbnail].forEach(elem => {
          elem.remove();
        });
      };
      delPhotoFromDND();
    }
  },
  mounted() {
    this.getEditAnimal === "" ? "" : (this.pet = this.getEditAnimal);
  },
  destroyed() {
    // Перед уходом обнулить редактируемое животное
    this.setEditAnimal("");
  }
};
</script>