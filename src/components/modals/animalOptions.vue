<template>
  <modal
    name="animalOptions"
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
    <div class="modal--body">
     <select class="wrap--input--select" v-model="item.sex">
          <option disabled value>Пол:</option>
          <option>Мужской</option>
          <option>Женский</option>
          <option>Неизвестно</option>
        </select>
        
        <select class="wrap--input--select" v-model="item.vaccinated">
          <option disabled value>Вакцинация:</option>
          <option>Пройдена</option>
          <option>Непройдена</option>
        </select>

          <select class="wrap--input--select" v-model="item.sterilized">
          <option disabled value>Стерилизация:</option>
          <option>Пройдена</option>
          <option>Непройдена</option>
          <option>Неизвестно</option>
        </select>
      
                  <select class="wrap--input--select" v-model="item.wc">
          <option disabled value>Приучен к туалету:</option>
          <option>Да</option>
          <option>Нет</option>
          <option>Неизвестно</option>
        </select>

                <select class="wrap--input--select" v-model="item.attitudeToChildren">
          <option disabled value>Отношение к детям:</option>
          <option>Позитивное</option>
          <option>Негативное</option>
          <option>Нейтральное</option>
          <option>Неизвестно</option>
        </select>

                       <select class="wrap--input--select" v-model="item.attitudeToAnimal">
          <option disabled value>Отношение к другим животным:</option>
          <option>Позитивное</option>
          <option>Негативное</option>
          <option>Нейтральное</option>
          <option>Неизвестно</option>
        </select>

                              <select class="wrap--input--select" v-model="item.temperament">
          <option disabled value>Темперамент:</option>
          <option>Очень активный</option>
          <option>Активный</option>
          <option>Ленивый</option>
          <option>Неизвестно</option>
        </select>
      </div>
  </modal>
</template>
<script>
import closeModalMixin from "../../plugins/mixin/close-modal-mixin.js";
export default {
  name: "animalOptions",
  mixins: [closeModalMixin],
  methods: {
    close(e) {
      if (e.keyCode === 27) this.$modal.hide("animalOptions");
    }
  }
};
</script>
