<template>
  <div class="admin-show">
    <ul class="edit-card--list">
      <li class="edit-card" v-for="(item, index) in this.getAnimals" :key="item['_id']">
        <img class="edit-card--image" :src="item.photo[0]">
        <div class="edit-card--header flex-center">
          <h2 class="edit-card--header--h edit-card--header--main">{{item.name}}</h2>
          <span class="edit-card--header-h">Статус: {{getProgress(item.progress)}}</span>
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
              <v-icon class="admin-icon--edit-animal" name="regular/trash-alt" label="Мусорное ведро"/>
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
          <!--  <ul class="edit-card--list">
          <li>
            <b>ID:</b>
            {{item['_id']}}
          </li>
          <li></li>
          </ul>-->
          <!-- <button class="edit-card--buttomn" v-on:click="edit(item['.key'])" type="submit">Редактировать</button> -->
          <v-dialog/>
          <changeAnimalStatus :obj="dataForChangeModal"></changeAnimalStatus>
          <custom-alert :text="dataForModal.text"></custom-alert>
        </div>
      </li>
    </ul>
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
      actionOnAnimal: "",
      dataForChangeModal: {
        item: "",
        action: "",
        result: "",
        transition: ""
      },
      dataForModal: {
        text: ""
      }
    };
  },
  components: {
    changeAnimalStatus
  },
  computed: {
    ...mapGetters(["getAnimals"])
  },
  methods: {
    ...mapActions(["getAnimal", "delAnimal"]),
    ...mapMutations(["setAllAnimals", "setEditAnimal", "delAnimalFromLocal"]),
    del(obj) {
      this.$modal.show("dialog", {
        title: "Внимание!",
        text: `Удаление животного из базы повлечет удаление всей истории пожертвований связанных
        с этим животным. Отменить это действие невозможно!`,
        transition: "fade",
        beforeOpen() {
          document.addEventListener("keyup", this.close);
        },
        beforeClose() {
          document.removeEventListener("keyup", this.close);
        },
        close(e) {
          if (e.keyCode === 27) this.$modal.hide("dialog");
        },
        buttons: [
          {
            title: "Все ясно, удалить",
            handler: () => {
              this.delAnimal(obj);
              this.delAnimalFromLocal(obj);
              this.$modal.hide("dialog");
            }
          },
          {
            title: "Я одумался, отменить", // Button title
            default: true, // Will be triggered by default if 'Enter' pressed.
            handler: () => {
              this.$modal.hide("dialog");
            }, // Button click handler
            class: "vue-dialog-button modal--button--main"
          }
        ]
      });
    },
    edit(data) {
      const editAnimal = data;
      editAnimal.photo = [];
      editAnimal.thumbnail = [];
      this.setEditAnimal(editAnimal);
      this.$router.push({ path: "/admin/add-animal" });
    },
    initChangeState(item) {
      this.dataForChangeModal.item = item;
      // Совершить переход SM
      this.$modal.show("changeAnimalStatus");
    },
    getProgress(item) {
      return progress[item];
    },
    changeShowState(index) {
      this.show[index] = true;
      this.show = [...this.show];
    }
  },
  mounted() {
    this.getAnimal({ number: "all" });
  }
};
</script>

