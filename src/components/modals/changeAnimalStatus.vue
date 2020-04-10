<template>
  <modal
    name="changeAnimalStatus"
    :adaptive="true"
    :max-width="600"
    :max-height="400"
    width="80%"
    height="auto"
  >
    <div class="modal--window-decor">
      <div class="modal--window-decor--one"></div>
      <div class="modal--window-decor--two"></div>
      <div class="modal--window-decor--three"></div>
      <div class="modal--window-decor--four"></div>
      <div class="modal--window-decor--five"></div>
    </div>
    <div class="modal--body changeAnimalStatus--body">
      <div v-show="showSelect" class="modal--body--sub">
        <select class="wrap--input--select__edit" v-on:change="setStatus($event)">
            <option disabled selected value>Изменить статус</option>
            <option value="booked">Забронировать</option>
            <option value="canceled">Бронь отменена</option>
            <option value="takenAway">Нашел новый дом</option>
            <option value="return">Вернулся обратно в приют</option>
            <option value="death">Умер</option>
          </select>
      </div>
      <div v-show="showText" class="modal--body--sub">
        <h2>Событие</h2>
        <textarea
          v-model="story"
          class="admin-panel--input changeAnimalStatus--body--textarea"
          placeholder="Описание события..."
          cols="30"
          rows="10"
        ></textarea>
        <button class="common--button modal--button--main" @click="change">Внести</button>
      </div>
      <div v-show="showAlert" class="modal--body--sub">
        <h2>Рузультат:</h2>
        <div>{{result}}</div>
        <button class="common--button modal--button--main" @click="hide">Закрыть</button>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import progress from "../../store/animalClass/progress.js";
import closeModalMixin from "../../plugins/mixin/close-modal-mixin.js";

export default {
  name: "changeAnimalStatus",
  mixins: [closeModalMixin],
  data: () => {
    return {
      story: "",
      showAlert: false,
      showText: false,
      showSelect: true,
      result: ""
    };
  },
  methods: {
    close(e) {
      if (e.keyCode === 27) this.hide();
    },
    change() {
      const item = this.obj.item;
      item[this.action](this.story);
      this.result
        ? `Теперь статус животного "${progress[item.status]}"`
        : `Ошибка, из статуса "${
            progress[item.progress]
          }" нельзя совершить переход "${[this.transition]}"`;
      this.showAlert = true;
      this.showText = false;
    },
    setStatus(event) {
      this.showSelect = false;
      const item = this.obj.item;
      console.log(event.target.value);
      console.log(item.state);
      this.result = item.can(event.target.value);
      this.transition = event.target.selectedOptions[0].innerText;
      this.action = event.target.value;
      // Совершить переход SM
      if (this.result) {
        this.showText = true;
      } else {
        alert(
          `Ошибка, из статуса "${
            progress[item.progress]
          }" нельзя совершить переход "${[this.transition]}"`
        );
        this.$modal.hide("changeAnimalStatus");
      }
    },
    hide() {
      this.showAlert = false;
      this.showText = false;
      this.showSelect = true;
      this.$modal.hide("changeAnimalStatus");
    }
  },
  props: ["obj"]
};
</script>
