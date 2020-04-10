<template>
  <div class="admin-show">
    <li class="edit-card" v-for="item in this.allRequests" :key="item['_id']">
      <img class="edit-card--image" :src="item.images[0]">
      <div class="edit-card--header flex-center">
        <h2 class="edit-card--header--h edit-card--header--main">{{item.fullName}}</h2>
        <span class="edit-card--header-h">Статус: {{item.status}}</span>
        <div class="edit-card--heder--icons">
          <button
            v-tooltip="'Редактировать питомца'"
            class="admin-panel--menu--list--button edit-card--buttomn"
            v-on:click="edit(item)"
            type="submit"
          >
            <v-icon class="admin-icon--edit-animal" name="pencil-alt" label="Карандаш"/>
          </button>
          <button
            v-tooltip="'Удалить питомца из каталога'"
            class="admin-panel--menu--list--button edit-card--buttomn"
            v-on:click="del(item)"
            type="submit"
          >
            <v-icon
              class="admin-icon--edit-animal"
              name="regular/trash-alt"
              label="Мусорное ведро"
            />
          </button>
          <button
            v-tooltip="'Изменить статус животного'"
            class="admin-panel--menu--list--button edit-card--buttomn"
            v-on:click="initChangeState(item)"
            type="submit"
          >
            <v-icon class="admin-icon--edit-animal" name="exchange-alt" label="Мусорное ведро"/>
          </button>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import changeAnimalStatus from "../../../components/modals/changeAnimalStatus.vue";
import progress from "../../../store/animalClass/progress.js";

export default {
  name: "editAnimal",
  data: () => {
    return {
      allRequests: ""
    };
  },
  methods: {
    ...mapActions(["getAnimal", "delAnimal"]),
    ...mapMutations(["setAllAnimals", "setEditAnimal", "delAnimalFromLocal"]),
    edit(item) {
      this.$shelter().acceptRequest(item);
    }
  },
  mounted() {
    this.$shelter()
      .getAllRequests({ filter: "" })
      .then(response => {
        this.allRequests = response.data.list;
        console.log(response.data.list);
      });
  }
};
</script>

